import dayjs from 'dayjs';
import { IntroductionRepository } from '../../domain/repositories/IntroductionRepository';
import { IntroductionListDto } from './dto/IntroductionListDto';

export default class GetIntroductionListUsecase {
    constructor(private introductionRepository: IntroductionRepository) {}

    async execute(): Promise<IntroductionListDto[]> {
        try {
            const IntroductionListView = await this.introductionRepository.findList();

            return IntroductionListView.map(
                (introduction) =>
                    new IntroductionListDto(
                        'introduction',
                        introduction.id,
                        introduction.userId,
                        introduction.title,
                        introduction.content,
                        introduction.workMode,
                        introduction.status,
                        dayjs(introduction.createdAt).format('YYYY-MM-DD'),
                        dayjs(introduction.updatedAt).format('YYYY-MM-DD'),
                        introduction.likes.length,
                        dayjs().diff(dayjs(introduction.createdAt), 'day'),
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
                    )
            );
        } catch (error) {
            console.error('Error fetching introduction list:', error);
            throw new Error('Failed to fetch introduction list');
        }
    }
}
