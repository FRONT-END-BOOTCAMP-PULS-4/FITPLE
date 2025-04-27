import { SbTeamRepository } from '../../infra/repositories/supabase/SbTeamRepository';
import { CreatedTeamDto } from './dto/createdTeamDto';
import { CreateTeamDto } from './dto/createTeamDto';

// 이미 회원가입된 사용자 로그인 처리 하는 usecase
export class CreateTeamUsecase {
    constructor(private teamRepository: SbTeamRepository) {}

    async execute(CreateTeamDto: CreateTeamDto): Promise<CreatedTeamDto> {
        try {
            const { userId, projectId } = CreateTeamDto;

            const existingTeam = await this.teamRepository.findByProjectId(projectId);

            if (existingTeam) {
                return {
                    id: existingTeam.id,
                    projectId: existingTeam.project_id,
                    userId: existingTeam.user_id,
                    createdAt: existingTeam.created_at,
                    message: '이미 팀에 속해있습니다.',
                };
            }

            const team = await this.teamRepository.create(userId, projectId);
            return {
                id: team.id,
                projectId: team.project_id,
                userId: team.user_id,
                createdAt: team.created_at,
                message: '팀 추가 성공',
            } as CreatedTeamDto;
        } catch (error) {
            console.error('로그인 처리 중 오류 발생:', error);
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            throw new Error(`로그인 처리 중 오류 발생: ${errorMessage}`);
        }
    }
}
