import { ProjectImgRepository } from '@/back/project/domain/repositories/ProjectImgRepository';
import { createClient } from '@/utils/supabase/server';

export class SbProjectImgRepository implements ProjectImgRepository {
    async createProjectImages(projectId: number, imgUrls: string[]): Promise<void> {
        const supabase = await createClient();

        if (!imgUrls.length) return;

        const inserts = imgUrls.map((url) => ({
            project_id: projectId,
            img_url: url,
        }));

        const { error } = await supabase.from('project_img').insert(inserts);

        if (error) {
            console.error('Failed to insert project images:', error);
            throw new Error('프로젝트 이미지 생성에 실패했습니다.');
        }
    }

    async updateProjectImages(projectId: number, imgUrls: string[]): Promise<void> {
        const supabase = await createClient();

        if (!imgUrls.length) return;

        // 기존 이미지 삭제
        const { error: deleteError } = await supabase.from('project_img').delete().eq('project_id', projectId);

        if (deleteError) {
            throw new Error(`Failed to delete old images: ${deleteError.message}`);
        }

        // 새 이미지 삽입
        const inserts = imgUrls.map((url) => ({
            project_id: projectId,
            img_url: url,
        }));

        const { error: insertError } = await supabase.from('project_img').insert(inserts);

        if (insertError) {
            throw new Error(`Failed to insert new images: ${insertError.message}`);
        }
    }

    async deleteProjectImages(projectId: number): Promise<void> {
        try {
            const supabase = await createClient();

            const { error } = await supabase.from('project_img').delete().eq('project_id', projectId);

            if (error) {
                throw new Error(`Failed to delete project image: ${error?.message}`);
            }
        } catch (error) {
            console.error(error);
            throw new Error('Unexpected error occurred while fetching project.');
        }
    }
}
