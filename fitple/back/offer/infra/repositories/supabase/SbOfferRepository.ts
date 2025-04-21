import { Offer } from "@/back/offer/domain/entities/Offer";
import { OfferRepository } from "@/back/offer/domain/repositories/OfferRepository";
import { OfferStatus } from "@/type/common";
import { createClient } from "@/utils/supabase/server";

export class SbOfferRepository implements OfferRepository {
    async findById(id: number): Promise<Offer> {
        const supabase = await createClient();
        const { data, error } = await supabase.from('offer').select().eq('id', id).single();

        if (error || !data) {
            throw new Error('Offer not found');
        }

        return {
            user_id: data.user_id,
            project_id: data.project_id,
            introduction_id: data.introduction_id,
            message: data.message,
            status: data.status,
            created_at: data.created_at,
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
            user_id: offer.user_id,
            project_id: offer.project_id,
            introduction_id: offer.introduction_id,
            message: offer.message,
            status: offer.status,
            created_at: offer.created_at, // dto에서 받은 값을 사용해야 함
          })
          .select()
          .single();
          console.log("error: ", error);
        if (error || !data) {
          throw new Error('Failed to save offer');
        }
      
        return {
          user_id: data.user_id,
          project_id: data.project_id,
          introduction_id: data.introduction_id,
          message: data.message,
          status: data.status,
          created_at: data.created_at,
        };
      }
      
}