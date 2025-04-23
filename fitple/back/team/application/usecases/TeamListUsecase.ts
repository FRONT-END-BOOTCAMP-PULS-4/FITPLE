import { TeamListDTO } from '@/back/team/application/usecases/dto/TeamListDto'
import { createClient } from '@/utils/supabase/server';

export class TeamListUsecase {
  async execute(userId: string): Promise<TeamListDTO[]> {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('team')
      .select(`
        id,
        project:project_id ( title ),
        user:user_id ( avatar_url )
      `)
      .eq('user_id', userId);

    if (error || !data) return [];

    return data.map((item: any) => ({
      id: item.id,
      projectTitle: item.project?.title ?? '제목 없음',
      avatarUrl: item.user?.avatar_url ?? '',
    }));
  }
}
