import { IntroductionPositionRepository } from '@/back/introduction/domain/repositories/IntroductionPositionRepository';
import { createClient } from '@/utils/supabase/server';

export class SbIntroductionPositionRepository implements IntroductionPositionRepository {
    async createIntroductionPositions(introductionId: number, positionIds: number[]): Promise<void> {
        const supabase = await createClient();

        try {
            const introductionPositions = positionIds.map((positionIds) => ({
                introduction_id: introductionId,
                position_id: positionIds,
            }));

            const { error } = await supabase.from('introduction_position').insert(introductionPositions);

            if (error) {
                throw new Error(`Failed to insert introduction positions: ${error.message}`);
            }
        } catch (error) {
            console.error('Error creating introduction introduction:', error);
            throw error;
        }
    }

    async updateIntroductionPositions(introductionId: number, newPositionIds: number[]): Promise<void> {
        const supabase = await createClient();

        if (newPositionIds.length === 0) {
            throw new Error('직무는 적어도 1개 이상 선택해야 합니다.');
        }

        const { error: deleteError } = await supabase
            .from('introduction_position')
            .delete()
            .eq('introduction_id', introductionId);

        if (deleteError) {
            throw new Error(`Failed to delete old positions: ${deleteError.message}`);
        }

        // 새로 삽입
        const inserts = newPositionIds.map((positionId) => ({
            introduction_id: introductionId,
            position_id: positionId,
        }));

        const { error: insertError } = await supabase.from('introduction_position').insert(inserts);

        if (insertError) {
            throw new Error(`Failed to insert new introduction: ${insertError.message}`);
        }
    }

    async deleteIntroductionPositions(introductionId: number): Promise<void> {
        try {
            const supabase = await createClient();

            const { error } = await supabase
                .from('introduction_position')
                .delete()
                .eq('introduction_id', introductionId);

            if (error) {
                throw new Error(`Failed to delete introduction introduction: ${error?.message}`);
            }
        } catch (error) {
            console.error(error);
            throw new Error('Unexpected error occurred while fetching introduction.');
        }
    }
}
