import { ProjectRepository } from '@/back/project/domain/repositories/ProjectRepository';

export class DeleteProjectUsecase {
    constructor(private projectRepository: ProjectRepository) {}

    async execute(id: number): Promise<void> {
        const projectId = id;

        await this.projectRepository.deleteProject(projectId);
    }
}
