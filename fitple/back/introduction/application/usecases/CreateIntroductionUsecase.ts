import { IntroductionRepository } from '../../domain/repositories/IntroductionRepository';
import { CreateIntroductiontDto } from './dto/CreateIntroductionDto';
import { IntroductionSkillRepository } from '../../domain/repositories/IntroductionSkillRepository';
import { IntroductionPositionRepository } from '../../domain/repositories/IntroductionPositionRepository';
import { IntroductionImgRepository } from '../../domain/repositories/IntroductionImgRepository';

export class CreateIntroductionUsecase {
    constructor(
        private readonly introductionepository: IntroductionRepository,
        private readonly skillRepository: IntroductionSkillRepository,
        private readonly positionRepository: IntroductionPositionRepository,
        private readonly imgRepository: IntroductionImgRepository
    ) {}

    async execute(dto: CreateIntroductiontDto): Promise<number> {
        const introduction = {
            userId: dto.userId,
            title: dto.title,
            content: dto.content,
            status: dto.status,
            workMode: dto.workMode,
        };

        const introductionId = await this.introductionepository.createIntroduction(introduction);
        await this.skillRepository.createIntroductionSkills(introductionId, dto.skills);
        await this.positionRepository.createIntroductionPositions(introductionId, dto.positions);

        if (dto.images?.length) {
            await this.imgRepository.createIntroductionImages(introductionId, dto.images);
        }

        return introductionId;
    }
}
