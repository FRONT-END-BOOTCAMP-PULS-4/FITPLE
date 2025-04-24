import { IntroductionRepository } from '../../domain/repositories/IntroductionRepository';
import { IntroductionSkillRepository } from '../../domain/repositories/IntroductionSkillRepository';
import { IntroductionPositionRepository } from '../../domain/repositories/IntroductionPositionRepository';
import { IntroductionImgRepository } from '../../domain/repositories/IntroductionImgRepository';
import { UpdateIntroductionDto } from './dto/UpdateIntroductionDto';

export class UpdateIntroductionUsecase {
    constructor(
        private readonly projectRepository: IntroductionRepository,
        private readonly skillRepository: IntroductionSkillRepository,
        private readonly positionRepository: IntroductionPositionRepository,
        private readonly imgRepository: IntroductionImgRepository
    ) {}

    async execute(dto: UpdateIntroductionDto): Promise<void> {
        const project = {
            id: dto.id,
            title: dto.title,
            content: dto.content,
            status: dto.status,
            workMode: dto.workMode,
        };

        // 1. 프로젝트 기본정보 업데이트
        await this.projectRepository.updateIntroduction(project);

        // 2. 스킬, 포지션, 이미지 기존거 삭제 후 재등록
        await this.skillRepository.updateIntroductionSkills(dto.id, dto.skills);

        await this.positionRepository.updateIntroductionPositions(dto.id, dto.positions);

        if (dto.images?.length) {
            await this.imgRepository.updateIntroductionImages(dto.id, dto.images);
        }
    }
}
