import { SbUserRepository } from '@/back/user/infra/repositories/supabase/SbUserRepository';
import { SbTeamRepository } from '../../infra/repositories/supabase/SbTeamRepository';
import { CreatedTeamDto } from './dto/createdTeamDto';
import { CreateTeamDto } from './dto/createTeamDto';

// 이미 회원가입된 사용자 로그인 처리 하는 usecase
export class CreateTeamUsecase {
    constructor(private teamRepository: SbTeamRepository, private userRepository: SbUserRepository) {}

    async execute(CreateTeamDto: CreateTeamDto): Promise<CreatedTeamDto> {
        try {
            const { type, receiveUserId, projectId, applyUserId } = CreateTeamDto;
            const existingTeam = await this.teamRepository.findTeam(projectId);
            if (!existingTeam) {
                if (type === 'apply') {
                    await this.teamRepository.create(applyUserId, projectId);
                } else {
                    const captinId = await this.userRepository.findByOfferId(applyUserId);
                    console.log('captinId', captinId);
                    if (!captinId) {
                        throw new Error('사용자를 찾을 수 없습니다.');
                    }
                    await this.teamRepository.create(captinId, projectId);
                }
                const team = await this.teamRepository.create(receiveUserId, projectId);
                return {
                    id: team.id,
                    projectId: team.project_id,
                    userId: team.user_id,
                    createdAt: team.created_at,
                    message: '팀 추가 성공',
                } as CreatedTeamDto;
            }
            const alreadyTeam = await this.teamRepository.findByProjectId(receiveUserId, projectId);
            if (alreadyTeam) {
                return {
                    id: alreadyTeam.id,
                    projectId: alreadyTeam.project_id,
                    userId: alreadyTeam.user_id,
                    createdAt: alreadyTeam.created_at,
                    message: '이미 팀에 속해있습니다.',
                };
            }
            const team = await this.teamRepository.create(receiveUserId, projectId);
            return {
                id: team.id,
                projectId: team.project_id,
                userId: team.user_id,
                createdAt: team.created_at,
                message: '팀 추가 성공',
            } as CreatedTeamDto;
        } catch (error) {
            console.error('팀 추가 처리 중 오류 발생:', error);
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            throw new Error(`팀 추가 처리 중 오류 발생: ${errorMessage}`);
        }
    }
}
