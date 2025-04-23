import dayjs from 'dayjs';
import { ProjectRepository } from '../../domain/repositories/ProjectRepository';
import { ProjectListDto } from './dto/ProjectListDto';

export default class GetProjectListUsecase {
    constructor(private projectRepository: ProjectRepository) {}

    async execute(): Promise<ProjectListDto[]> {
        try {
            const projectListView = await this.projectRepository.findList();

            return projectListView.map(
                (project) =>
                    new ProjectListDto(
                        'project',
                        project.id,
                        project.userId,
                        project.title,
                        project.content,
                        project.duration,
                        project.workMode,
                        project.status,
                        dayjs(project.createdAt).format('YYYY-MM-DD'),
                        dayjs(project.updatedAt).format('YYYY-MM-DD'),
                        project.likes.length,
                        dayjs().diff(dayjs(project.createdAt), 'day'),
                        project.skills.map((skill) => ({
                            id: skill.id,
                            name: skill.skillName,
                        })),
                        project.positions.map((position) => ({
                            id: position.id,
                            name: position.positionName,
                        })),
                        project.user
                    )
            );
        } catch (error) {
            console.error('Error fetching project list:', error);
            throw new Error('Failed to fetch project list');
        }
    }
}
