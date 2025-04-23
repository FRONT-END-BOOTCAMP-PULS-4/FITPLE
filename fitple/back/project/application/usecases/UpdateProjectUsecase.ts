import { UpdateProjectDto } from './dto/UpdateProjectDto';
import { ProjectRepository } from '@/back/project/domain/repositories/ProjectRepository';
import { ProjectSkillRepository } from '@/back/project/domain/repositories/ProjectSkillRepository';
import { ProjectImgRepository } from '@/back/project/domain/repositories/ProjectImgRepository';
import { ProjectPositionRepository } from '@/back/project/domain/repositories/ProjectPositionRepository';

export class UpdateProjectUsecase {
    constructor(
        private readonly projectRepository: ProjectRepository,
        private readonly skillRepository: ProjectSkillRepository,
        private readonly positionRepository: ProjectPositionRepository,
        private readonly imgRepository: ProjectImgRepository
    ) {}

    async execute(dto: UpdateProjectDto): Promise<void> {
        const project = {
            id: dto.id,
            title: dto.title,
            content: dto.content,
            duration: dto.duration,
            status: dto.status,
            workMode: dto.workMode,
        };

        // 1. 프로젝트 기본정보 업데이트
        await this.projectRepository.updateProject(project);

        // 2. 스킬, 포지션, 이미지 기존거 삭제 후 재등록
        await this.skillRepository.updateProjectSkills(dto.id, dto.skills);

        await this.positionRepository.updateProjectPositions(dto.id, dto.positions);

        if (dto.images?.length) {
            await this.imgRepository.createProjectImages(dto.id, dto.images);
        }
    }
}
