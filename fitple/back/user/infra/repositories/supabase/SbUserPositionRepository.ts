import { UserPosition } from '@/back/user/domain/entities/UserPosition';
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
    async create(userPosition: UserPosition): Promise<UserPositionView> {
        const supabase = await createClient();

        const { data, error } = await supabase
            .from('user_position')
            .insert({
                user_id: userPosition.userId,
                position_id: userPosition.positionId,
            })
            .select()
            .maybeSingle();

        if (error) {
            throw new Error(`Error saving user position: ${error.message}`);
        }

        if (!data) {
            throw new Error('Failed to retrieve saved user position data.');
        }

        return data; // 삽입된 모든 기술 반환
    }
}
