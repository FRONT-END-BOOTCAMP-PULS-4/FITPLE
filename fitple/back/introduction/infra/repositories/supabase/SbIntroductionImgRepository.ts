import { IntroductionImgRepository } from '@/back/introduction/domain/repositories/IntroductionImgRepository';
import { createClient } from '@/utils/supabase/server';

export class SbIntroductionImgRepository implements IntroductionImgRepository {
    async createIntroductionImages(introductionId: number, imgUrls: string[]): Promise<void> {
        const supabase = await createClient();

        if (!imgUrls.length) return;

        const inserts = imgUrls.map((url) => ({
            introduction_id: introductionId,
            img_url: url,
        }));

        const { error } = await supabase.from('introduction_img').insert(inserts);

        if (error) {
            console.error('Failed to insert introduction images:', error);
            throw new Error('게시글 이미지 생성에 실패했습니다.');
        }
    }

    async updateIntroductionImages(introductionId: number, imgUrls: string[]): Promise<void> {
        const supabase = await createClient();

        if (!imgUrls.length) return;

        // 기존 이미지 삭제
        const { error: deleteError } = await supabase
            .from('introduction_img')
            .delete()
            .eq('introduction_id', introductionId);

        if (deleteError) {
            throw new Error(`Failed to delete old images: ${deleteError.message}`);
        }

        // 새 이미지 삽입
        const inserts = imgUrls.map((url) => ({
            introduction_id: introductionId,
            img_url: url,
        }));

        const { error: insertError } = await supabase.from('introduction_img').insert(inserts);

        if (insertError) {
            throw new Error(`Failed to insert new images: ${insertError.message}`);
        }
    }

    async deleteIntroductionImages(introductionId: number): Promise<void> {
        try {
            const supabase = await createClient();

            const { error } = await supabase.from('introduction_img').delete().eq('introduction_id', introductionId);

            if (error) {
                throw new Error(`Failed to delete introduction image: ${error?.message}`);
            }
        } catch (error) {
            console.error(error);
            throw new Error('Unexpected error occurred while fetching introduction.');
        }
    }
}
