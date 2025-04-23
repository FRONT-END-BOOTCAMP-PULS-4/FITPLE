// src/back/position/infra/repositories/supabase/SbPositionRepository.ts
import { PositionRepository } from '@/back/position/domain/repositories/PositionRepository';
import { Position } from '@/back/position/domain/entities/Position';
import { createClient } from '@/utils/supabase/server';

export class SbPositionRepository implements PositionRepository {
    async findAll(): Promise<Position[]> {
        const supabase = await createClient();
        const { data, error } = await supabase.from('position').select('*');
        if (error) {
            console.error('Supabase Get Error:', error);
            throw new Error('Failed to get position list');
        }
        return data.map((item) => new Position(item.id, item.position_name));
    }
}
