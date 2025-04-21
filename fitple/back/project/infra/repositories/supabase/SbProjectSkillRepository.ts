import { ProjectSkillRepository } from '@/back/project/domain/repositories/ProjectSkillRepository';
import { createClient } from '@/utils/supabase/client';

export class SbProjectSkillRepository implements ProjectSkillRepository {
    async createProjectSkills(projectId: number, skillIds: number[]): Promise<void> {
        const supabase = createClient();

        const insertData = skillIds.map((skillId) => ({
            project_id: projectId,
            skill_id: skillId,
        }));

        const { error } = await supabase.from('project_skill').insert(insertData);

        if (error) {
            console.error('project_skill insert error:', error);
            throw new Error('프로젝트 기술 스킬 저장에 실패했습니다.');
        }
    }

    async updateProjectSkills(projectId: number, newskillIds: number[]): Promise<void> {
        const supabase = createClient();

        if (newskillIds.length === 0) {
            throw new Error('기술스택은 적어도 1개 이상 선택해야 합니다.');
        }

        const { error: deleteError } = await supabase.from('project_skill').delete().eq('project_id', projectId);

        if (deleteError) {
            throw new Error(`Failed to delete old skills: ${deleteError.message}`);
        }

        // 새로 삽입
        const inserts = newskillIds.map((skillId) => ({
            project_id: projectId,
            skill_id: skillId,
        }));

        const { error: insertError } = await supabase.from('project_skill').insert(inserts);

        if (insertError) {
            throw new Error(`Failed to insert new skills: ${insertError.message}`);
        }
    }
}
