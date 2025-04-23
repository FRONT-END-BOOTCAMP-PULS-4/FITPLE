import { CreateProjectDto } from './dto/CreateProjectDto';
import { ProjectRepository } from '@/back/project/domain/repositories/ProjectRepository';
import { ProjectSkillRepository } from '@/back/project/domain/repositories/ProjectSkillRepository';
import { ProjectImgRepository } from '@/back/project/domain/repositories/ProjectImgRepository';
import { ProjectPositionRepository } from '@/back/project/domain/repositories/ProjectPositionRepository';

export class CreateProjectUsecase {
    constructor(
        private readonly projectRepository: ProjectRepository,
        private readonly skillRepository: ProjectSkillRepository,
        private readonly positionRepository: ProjectPositionRepository,
        private readonly imgRepository: ProjectImgRepository
    ) {}

    async execute(dto: CreateProjectDto): Promise<number> {
        const project = {
            userId: dto.userId,
            title: dto.title,
            content: dto.content,
            duration: dto.duration,
            status: dto.status,
            workMode: dto.workMode,
        };

        const projectId = await this.projectRepository.createProject(project);
        await this.skillRepository.createProjectSkills(projectId, dto.skills);
        await this.positionRepository.createProjectPositions(projectId, dto.positions);

        if (dto.images?.length) {
            await this.imgRepository.createProjectImages(projectId, dto.images);
        }

        return projectId;
    }
}
