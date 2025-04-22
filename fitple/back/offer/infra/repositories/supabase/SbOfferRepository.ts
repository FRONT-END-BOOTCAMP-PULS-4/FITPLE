import { Offer } from '@/back/offer/domain/entities/Offer';
import { OfferRepository } from '@/back/offer/domain/repositories/OfferRepository';
import { OfferStatus } from '@/type/common';
import { createClient } from '@/utils/supabase/server';

export class SbOfferRepository implements OfferRepository {
    async findById(id: number): Promise<Offer> {
        const supabase = await createClient();
        const { data, error } = await supabase.from('offer').select().eq('id', id).single();

        if (error || !data) {
            throw new Error('Offer not found');
        }

        return {
            id: data.id,
            userId: data.user_id,
            projectId: data.project_id,
            introductionId: data.introduction_id,
            message: data.message,
            status: data.status,
            createdAt: data.created_at,
        };
    }
    async updateStatus(id: number, status: OfferStatus): Promise<void> {
        const supabase = await createClient();
        const { error } = await supabase.from('offer').update({ status }).eq('id', id);

        if (error) {
            console.error('Supabase Update Error:', error);
            throw new Error('Failed to update offer status');
        }
    }
    async save(offer: Offer): Promise<Offer> {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from('offer')
            .insert({
                id: offer.id,
                user_id: offer.userId,
                project_id: offer.projectId,
                introduction_id: offer.introductionId,
                message: offer.message,
                status: offer.status,
                created_at: offer.createdAt, // dto에서 받은 값을 사용해야 함
            })
            .select()
            .single();
        console.log('error: ', error);
        if (error || !data) {
            throw new Error('Failed to save offer');
        }

        return {
            id: data.id,
            userId: data.user_id,
            projectId: data.project_id,
            introductionId: data.introduction_id,
            message: data.message,
            status: data.status,
            createdAt: data.created_at,
        };
    }
}
