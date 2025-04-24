import { createClient } from '@/utils/supabase/server';
import { Apply } from '../../../domain/entities/Apply';
import { ApplyRepository } from '../../../domain/repositories/ApplyRepository';
import { ApplyStatus } from '@/type/common';
import { ApplyApplicantView } from '@/back/apply/domain/entities/ApplyApplicantView';
import { Position, Skill } from '@/back/project/infra/types';
import { User } from '@/back/user/domain/entities/User';

export class SbApplyRepository implements ApplyRepository {
    async findById(id: number): Promise<Apply> {
        const supabase = await createClient();
        const { data, error } = await supabase.from('apply').select().eq('id', id).single();

        if (error || !data) {
            throw new Error('Apply not found');
        }
        return {
            id: data.id,
            userId: data.user_id,
            projectId: data.project_id,
            message: data.message,
            status: data.status,
            createdAt: data.created_at,
        };
    }

    async updateStatus(id: number, status: ApplyStatus): Promise<void> {
        const supabase = await createClient();
        const { error } = await supabase.from('apply').update({ status }).eq('id', id);

        if (error) {
            throw new Error('Failed to update apply status');
        }
    }

    async createApply(apply: Apply): Promise<Apply> {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from('apply')
            .insert({
                id: apply.id,
                user_id: apply.userId,
                project_id: apply.projectId,
                message: apply.message,
                status: apply.status,
                created_at: apply.createdAt, // dto에서 받은 값을 사용해야 함
            })
            .select()
            .single();
        console.log('error: ', error);
        if (error || !data) {
            throw new Error('Failed to save apply');
        }

        return {
            id: data.id,
            userId: data.user_id,
            projectId: data.project_id,
            message: data.message,
            status: data.status,
            createdAt: data.created_at,
        };
    }
    async findApplicants(projectId: number): Promise<ApplyApplicantView[]> {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from('apply')
            .select(
                `
                id, user_id, project_id, message, status, created_at,
                user (
                    id, name, email, avatar_url, nickname, career, created_at, updated_at
                ),
                user_skill (
                    skill (
                        id, skill_name
                    )
                ),
                user_position (
                    position (
                        id, position_name
                    )
                )
                `
            )
            .eq('project_id', projectId);

        if (error || !data) {
            throw new Error('Failed to fetch applicants');
        }

        const applicants = data.map((apply: any) => {
            const user: User = {
                id: apply.user.id,
                name: apply.user.name,
                email: apply.user.email,
                avatarUrl: apply.user.avatar_url,
                nickname: apply.user.nickname,
                career: apply.user.career,
                createdAt: apply.user.created_at,
                updatedAt: apply.user.updated_at,
            };

            const skills: Skill[] = (apply.user_skill || []).map((us: any) => ({
                id: us.skill.id,
                name: us.skill.skill_name,
            }));

            const position: Position[] = (apply.user_position || []).map((up: any) => ({
                id: up.position.id,
                name: up.position.position_name,
            }));

            return new ApplyApplicantView(
                apply.id,
                apply.user_id,
                apply.project_id,
                apply.message,
                apply.status,
                apply.created_at,
                user,
                skills,
                position
            );
        });

        return applicants;
    }
}
