import { ProjectRepository } from '@/back/project/domain/repositories/ProjectRepository';
import { ProjectSkillRepository } from '@/back/project/domain/repositories/ProjectSkillRepository';
import { ProjectImgRepository } from '@/back/project/domain/repositories/ProjectImgRepository';
import { ProjectPositionRepository } from '@/back/project/domain/repositories/ProjectPositionRepository';

export class DeleteProjectUsecase {
    constructor(
        private readonly projectRepository: ProjectRepository,
        private readonly skillRepository: ProjectSkillRepository,
        private readonly positionRepository: ProjectPositionRepository,
        private readonly imgRepository: ProjectImgRepository
    ) {}

    async execute(id: number): Promise<void> {
        const projectId = id;

        // 1. 관련된 스킬, 포지션, 이미지 삭제
        await this.skillRepository.deleteProjectSkills(projectId);
        await this.positionRepository.deleteProjectPositions(projectId);
        await this.imgRepository.deleteProjectImages(projectId);

        // 2. 프로젝트 삭제
        await this.projectRepository.deleteProject(projectId);
    }
}
