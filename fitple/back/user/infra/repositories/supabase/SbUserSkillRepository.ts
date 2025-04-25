import { UserSkill } from '@/back/user/domain/entities/UserSkill';
import { UserSkillView } from '@/back/user/domain/entities/UserSkillView';
import { UserSkillRepository } from '@/back/user/domain/repositories/UserSkillRepository';
import { createClient } from '@/utils/supabase/server';

export class SbUserSkillRepository implements UserSkillRepository {
    async findAllByUserId(id: string): Promise<UserSkillView[]> {
        const supabase = await createClient();
        const { data, error } = await supabase.from('user_skill').select('*').eq('user_id', id);
        if (error && error.code !== 'PGRST116') {
            throw new Error(`Error fetching user by ID: ${error.message}`);
        }

        return data ?? [];
    }
    async create(userSkill: UserSkill): Promise<UserSkill[]> {
        const supabase = await createClient();
        const insertedSkills: UserSkill[] = [];

        for (const skill of Array.isArray(userSkill.skillId) ? userSkill.skillId : [userSkill.skillId]) {
            const { data, error } = await supabase
                .from('user_skill') // user_skill 테이블에 삽입
                .insert({
                    user_id: userSkill.userId,
                    skill_id: skill,
                })
                .select()
                .maybeSingle();

            if (error) {
                throw new Error(`Error saving user skill: ${error.message}`);
            }

            if (!data) {
                throw new Error('Failed to retrieve saved user skill data.');
            }

            insertedSkills.push(data as UserSkill); // 삽입된 데이터를 배열에 추가
        }

        return insertedSkills; // 삽입된 모든 기술 반환
    }
}
