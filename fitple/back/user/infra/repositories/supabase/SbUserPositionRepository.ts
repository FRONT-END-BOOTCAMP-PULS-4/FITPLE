import { UserPositionView } from '@/back/user/domain/entities/UserPositionView';
import { UserPositionRepository } from '@/back/user/domain/repositories/UserPositionRepository';
import { createClient } from '@/utils/supabase/server';

export class SbUserPositionRepository implements UserPositionRepository {
    async findByUserId(id: string): Promise<UserPositionView> {
        const supabase = await createClient();

        const { data, error } = await supabase.from('user_position').select('*').eq('user_id', id).maybeSingle();

        if (error && error.code !== 'PGRST116') {
            throw new Error(`Error fetching user by ID: ${error.message}`);
        }

        return data;
    }
}
