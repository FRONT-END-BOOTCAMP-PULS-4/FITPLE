import { Project } from '@/back/project/domain/entities/Project';
import { ProjectList } from '@/back/project/domain/entities/ProjectList';
import { ProjectRepository } from '@/back/project/domain/repositories/ProjectRepository';
import { createClient } from '@/utils/supabase/client';
import { ProjectDetail } from '@/back/project/domain/entities/ProjectDetail';
import { ProjectWithDetailRelations, ProjectWithRelations } from '../../types';

export class SbProjectRepository implements ProjectRepository {
    async findProjectById(projectId: number): Promise<Project> {
        const supabase = createClient();

        const { data, error } = await supabase.from('project').select().eq('id', projectId).maybeSingle();

        if (error) {
            throw new Error(`Failed to fetch project detail: ${error.message}`);
        }

        return {
            id: data.id,
            userId: data.user_id,
            title: data.title,
            content: data.content,
            duration: data.duration,
            workMode: data.work_mode,
            status: data.status,
            createdAt: data.created_at,
            updatedAt: data.updated_at,
        };
    }

    async findProjectByIdView(projectId: number): Promise<ProjectDetail> {
        const supabase = createClient();
        const { data, error } = (await supabase
            .from('project')
            .select(
                `
                id,
                user_id,
                title,
                content,
                duration,
                work_mode,
                status,
                created_at,
                updated_at,
                users (
                    nickname,
                    avatar_url,
                    career
                ),
                project_skill (
                    skill (
                        id,
                        skill_name
                    )
                ),
                project_like (
                    id,
                    user_id,
                    project_id,
                    created_at
                ),
                project_img (
                    img_url,
                    id,
                    project_id
                ),
                project_position (
                    position (
                        id,
                        position_name
                    )
                )
            `
            )
            .eq('id', projectId)
            .maybeSingle()) as unknown as {
            data: ProjectWithDetailRelations;
            error: Error;
        };

        if (error) {
            throw new Error(`Failed to fetch project detail: ${error?.message}`);
        }

        return {
            id: data.id,
            userId: data.user_id,
            title: data.title,
            content: data.content,
            duration: data.duration,
            workMode: data.work_mode,
            status: data.status,
            createdAt: data.created_at,
            updatedAt: data.updated_at,
            likeCount: data.project_like.length,
            skills: data.project_skill.map((sk) => ({
                id: sk.skill.id,
                name: sk.skill.skill_name,
            })),
            positions: data.project_position.map((pos) => ({
                id: pos.position.id,
                name: pos.position.position_name,
            })),
            imgUrl: data.project_img.map((img) => img.img_url),
            user: {
                nickname: data.users.nickname,
                avatarUrl: data.users.avatar_url,
                career: data.users.career,
            },
        };
    }

    async findProjectList(): Promise<Project[]> {
        const supabase = createClient();

        const { data, error } = await supabase.from('project').select('*');

        if (error) {
            throw new Error(`Failed to fetch project list: ${error.message}`);
        }

        const projectList: Project[] = data.map((project) => ({
            id: project.id,
            userId: project.user_id,
            title: project.title,
            content: project.content,
            duration: project.duration,
            workMode: project.work_mode,
            status: project.status,
            createdAt: project.created_at,
            updatedAt: project.updated_at,
        }));

        return projectList || [];
    }

    async findProjectListView(projectIds: number[]): Promise<ProjectList[]> {
        const supabase = createClient();
        const { data: projectList, error } = (await supabase
            .from('project')
            .select(
                `
                id,
                title,
                user_id,
                content,
                duration,
                work_mode,
                status,
                created_at,
                updated_at,
                users (
                    nickname,
                    avatar_url,
                    career
                ),
                project_skill (
                    skill (
                        id,
                        skill_name
                    )
                ),
                project_like:project_like (
                    id,
                    user_id,
                    project_id,
                    created_at
                ),
                project_position (
                    position (
                        id,
                        position_name
                    )
                )
            `
            )
            .in('id', projectIds)) as unknown as { data: ProjectWithRelations[]; error: Error };

        if (error) throw new Error(`Failed to fetch projects with skills and positions: ${error.message}`);

        const projectListDto = projectList.map((project) => ({
            id: project.id,
            userId: project.user_id,
            title: project.title,
            content: project.content,
            duration: project.duration,
            workMode: project.work_mode,
            status: project.status,
            createdAt: project.created_at,
            updatedAt: project.updated_at,
            skills: project.project_skill.map((sk) => ({
                id: sk.skill.id,
                name: sk.skill.skill_name,
            })),
            positions: project.project_position.map((pos) => ({
                id: pos.position.id,
                name: pos.position.position_name,
            })),
            likeCount: project.project_like.length,
            user: {
                nickname: project.users.nickname,
                avatarUrl: project.users.avatar_url,
                career: project.users.career,
            },
        }));

        return projectListDto;
    }

    async createProject(project: Partial<Project>): Promise<Project> {
        const supabase = createClient();

        const { data, error } = await supabase
            .from('project')
            .insert({
                user_id: project.userId,
                title: project.title,
                content: project.content,
                duration: project.duration,
                work_mode: project.workMode,
                status: project.status,
            })
            .select()
            .single();

        if (error) {
            throw new Error(`Failed to create project: ${error.message}`);
        }

        return new Project(
            data.id,
            data.user_id,
            data.title,
            data.content,
            data.duration,
            data.work_mode,
            data.status,
            new Date(data.created_at),
            new Date(data.updated_at)
        );
    }

    async updateProject(project: Partial<Project>): Promise<Project> {
        const supabase = createClient();

        if (!project.id) {
            throw new Error('Project ID is required to update the project.');
        }

        const { data, error } = await supabase
            .from('project')
            .update({
                title: project.title,
                content: project.content,
                duration: project.duration,
                work_mode: project.workMode,
                status: project.status,
            })
            .eq('id', project.id)
            .select()
            .single();

        if (error) {
            throw new Error(`Failed to update project: ${error.message}`);
        }

        return new Project(
            data.id,
            data.user_id,
            data.title,
            data.content,
            data.duration,
            data.work_mode,
            data.status,
            new Date(data.created_at),
            new Date(data.updated_at)
        );
    }

    async deleteProject(id: number): Promise<void> {
        const supabase = createClient();

        const { error } = await supabase.from('project').delete().eq('id', id);

        if (error) {
            throw new Error(`프로젝트 삭제 실패: ${error.message}`);
        }
    }
}
