import dayjs from 'dayjs';
import { ProjectRepository } from '../../domain/repositories/ProjectRepository';
import { MyProjectDto } from './dto/MyProjectDto';

export default class GetMyProjectListUsecase {
    constructor(private projectRepository: ProjectRepository) {}

    async execute(userId: string): Promise<MyProjectDto[]> {
        try {
            const projectListView = await this.projectRepository.findAllByMyProject(userId);

            return projectListView.map(
                (project) =>
                    new MyProjectDto(
                        project.id,
                        project.title,
                        project.content,
                        project.duration,
                        project.workMode,
                        project.status,
                        dayjs(project.createdAt).format('YYYY-MM-DD'),
                        dayjs(project.updatedAt).format('YYYY-MM-DD')
                    )
            );
        } catch (error) {
            console.error('Error fetching project list:', error);
            throw new Error('Failed to fetch project list');
        }
    }
}
