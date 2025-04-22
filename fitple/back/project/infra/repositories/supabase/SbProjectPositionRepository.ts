import { ProjectPositionRepository } from '@/back/project/domain/repositories/ProjectPositionRepository';
import { createClient } from '@/utils/supabase/server';

export class SbProjectPositionRepository implements ProjectPositionRepository {
    async createProjectPositions(projectId: number, positionIds: number[]): Promise<void> {
        const supabase = await createClient();

        try {
            const projectPositions = positionIds.map((positionId) => ({
                project_id: projectId,
                position_id: positionId,
            }));

            const { error } = await supabase.from('project_position').insert(projectPositions);

            if (error) {
                throw new Error(`Failed to insert project positions: ${error.message}`);
            }
        } catch (error) {
            console.error('Error creating project positions:', error);
            throw error;
        }
    }

    async updateProjectPositions(projectId: number, newPositionIds: number[]): Promise<void> {
        const supabase = await createClient();

        if (newPositionIds.length === 0) {
            throw new Error('직무는 적어도 1개 이상 선택해야 합니다.');
        }

        const { error: deleteError } = await supabase.from('project_position').delete().eq('project_id', projectId);

        if (deleteError) {
            throw new Error(`Failed to delete old positions: ${deleteError.message}`);
        }

        // 새로 삽입
        const inserts = newPositionIds.map((positionId) => ({
            project_id: projectId,
            position_id: positionId,
        }));

        const { error: insertError } = await supabase.from('project_position').insert(inserts);

        if (insertError) {
            throw new Error(`Failed to insert new positions: ${insertError.message}`);
        }
    }

    async deleteProjectPositions(projectId: number): Promise<void> {
        try {
            const supabase = await createClient();

            const { error } = await supabase.from('project_position').delete().eq('project_id', projectId);

            if (error) {
                throw new Error(`Failed to delete project positions: ${error?.message}`);
            }
        } catch (error) {
            console.error(error);
            throw new Error('Unexpected error occurred while fetching project.');
        }
    }
}
