import { IntroductionSkillRepository } from '@/back/introduction/domain/repositories/IntroductionSkillRepository';
import { createClient } from '@/utils/supabase/server';

export class SbIntroductionSkillRepository implements IntroductionSkillRepository {
    async createIntroductionSkills(introductionId: number, skillIds: number[]): Promise<void> {
        const supabase = await createClient();

        const insertData = skillIds.map((skillId) => ({
            introduction_id: introductionId,
            skill_id: skillId,
        }));

        const { error } = await supabase.from('introduction_skill').insert(insertData);

        if (error) {
            console.error('introduction skill insert error:', error);
            throw new Error('프로젝트 기술 스킬 저장에 실패했습니다.');
        }
    }

    async updateIntroductionSkills(introductionId: number, newskillIds: number[]): Promise<void> {
        const supabase = await createClient();

        if (newskillIds.length === 0) {
            throw new Error('기술스택은 적어도 1개 이상 선택해야 합니다.');
        }

        const { error: deleteError } = await supabase
            .from('introduction_skill')
            .delete()
            .eq('introduction_id', introductionId);

        if (deleteError) {
            throw new Error(`Failed to delete old skills: ${deleteError.message}`);
        }

        // 새로 삽입
        const inserts = newskillIds.map((skillId) => ({
            introduction_id: introductionId,
            skill_id: skillId,
        }));

        const { error: insertError } = await supabase.from('introduction_skill').insert(inserts);

        if (insertError) {
            throw new Error(`Failed to insert new skills: ${insertError.message}`);
        }
    }

    async deleteIntroductionSkills(introductionId: number): Promise<void> {
        try {
            const supabase = await createClient();

            const { error } = await supabase.from('introduction_skill').delete().eq('introduction_id', introductionId);

            if (error) {
                throw new Error(`Failed to delete introduction skills: ${error?.message}`);
            }
        } catch (error) {
            console.error(error);
            throw new Error('Unexpected error occurred while fetching introduction.');
        }
    }
}
