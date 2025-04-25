import { TeamListDTO } from '@/back/team/application/usecases/dto/TeamListDto';
import { createClient } from '@/utils/supabase/server';

export class TeamListUsecase {
  async execute(userId: string): Promise<TeamListDTO[]> {
    const supabase = await createClient();

    const { data: userTeams, error } = await supabase
      .from('team')
      .select('project_id')
      .eq('user_id', userId);

    if (error || !userTeams.length) return [];

    const projectIds = userTeams.map((team) => team.project_id);

    const { data: teamData, error: teamError } = await supabase
      .from('team')
      .select(`
        id,
        project_id,
        project:project_id ( title ),
        user:user_id ( avatar_url )
      `)
      .in('project_id', projectIds);

    if (teamError || !teamData) return [];

    const teamMap = new Map<number, TeamListDTO>();

    teamData.forEach((item) => {
      const existingTeam = teamMap.get(item.project_id);

      if (existingTeam) {
        existingTeam.avatarUrls.push(item.user?.avatar_url || '/images/test-team.png');
      } else {
        teamMap.set(item.project_id, {
          id: item.id,
          projectId: item.project_id,
          projectTitle: item.project?.title ?? '제목 없음',
          avatarUrls: [item.user?.avatar_url || '/images/test-team.png'],
        });
      }
    });

    return Array.from(teamMap.values());
  }
}
