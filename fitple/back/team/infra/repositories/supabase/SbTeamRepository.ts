// infra/repositories/supabase/SbTeamRepository.ts

import { Team } from '@/back/team/domain/entities/Team';
import { TeamRepository } from '@/back/team/domain/repositories/TeamRepository';
import { createClient } from '@/utils/supabase/server';

export class SbTeamRepository implements TeamRepository {
  async findByUserId(userId: string): Promise<Team[]> {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('team')
      .select('*')
      .eq('user_id', userId);

    if (error) {
      console.error('findByUserId Error:', error.message);
      return [];
    }

    if (!data) return [];

    return data.map(
      (item) =>
        new Team(item.id, item.user_id, item.project_id, new Date(item.created_at))
    );
  }
}
