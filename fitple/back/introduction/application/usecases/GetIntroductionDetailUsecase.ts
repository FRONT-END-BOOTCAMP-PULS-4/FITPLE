import dayjs from 'dayjs';
import { IntroductionRepository } from '../../domain/repositories/IntroductionRepository';
import { IntroductionDetailDto } from './dto/IntroductionDetailDto';

export class GetIntroductionDetailUsecase {
    constructor(private introductiontRepository: IntroductionRepository) {}

    async execute(projectId: number): Promise<IntroductionDetailDto> {
        const introduction = await this.introductiontRepository.findById(projectId);

        return new IntroductionDetailDto(
            introduction.id,
            introduction.title,
            introduction.content,
            introduction.workMode,
            introduction.status,
            dayjs(introduction.createdAt).format('YYYY-MM-DD'),
            dayjs(introduction.updatedAt).format('YYYY-MM-DD'),
            introduction.images?.map((img) => img.imgUrl) || [],
            introduction.likes.length,
            introduction.skills.map((skill) => ({
                id: skill.id,
                name: skill.skillName,
            })),
            introduction.positions.map((position) => ({
                id: position.id,
                name: position.positionName,
            })),
            {
                nickname: introduction.user.nickname,
                avatarUrl: introduction.user.avatarUrl || '/images/test-team.png',
                career: introduction.user.career,
            }
        );
    }
}
