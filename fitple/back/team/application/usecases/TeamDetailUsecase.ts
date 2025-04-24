import { TeamDetailDTO } from '@/back/team/application/usecases/dto/TeamDetailDto';
import { createClient } from '@/utils/supabase/server';

export class TeamDetailUsecase {
  async execute(projectId: string): Promise<TeamDetailDTO[]> {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('team')
      .select(`
        user:user_id (
          nickname,
          avatar_url,
          user_position (
            position:position_id (
              position_name
            )
          ),
          user_skill (
            skill:skill_id (
              skill_name
            )
          )
        )
      `)
      .eq('project_id', projectId);
    if (error || !data) {
      console.error('Error in TeamDetailUsecase:', error.message);
      return [];
    }

    return data.map((item: any) => ({
      userNickname: item.user.nickname,
      userAvatarUrl: item.user.avatar_url,
      userPosition: item.user.user_position?.[0]?.position?.position_name ?? '',
      userSkill: item.user.user_skill
        ?.map((us: any) => us.skill?.skill_name)
        .filter(Boolean)
        .join(', ') ?? '',
    }));
  }
}
