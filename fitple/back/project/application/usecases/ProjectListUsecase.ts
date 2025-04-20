import dayjs from 'dayjs';
import { ProjectRepository } from '../../domain/repositories/ProjectRepository';
import { ProjectListDto } from './dto/ProjectListDto';

export default class ProjectListUsecase {
    constructor(private projectRepository: ProjectRepository) {}

    async execute(): Promise<ProjectListDto[]> {
        try {
            const projectList = await this.projectRepository.findProjectList();

            if (!projectList) throw new Error('project not found');

            const projectIds = projectList.map((project) => project.id);
            const projectListView = await this.projectRepository.findProjectListView(projectIds);

            return projectListView.map(
                (project) =>
                    new ProjectListDto(
                        project.id,
                        project.title,
                        project.userId,
                        project.content,
                        project.duration,
                        project.workMode,
                        project.status,
                        dayjs(project.createdAt).format('YYYY-MM-DD'),
                        dayjs(project.updatedAt).format('YYYY-MM-DD'),
                        project.skills,
                        project.likeCount,
                        project.user,
                        project.positions
                    )
            );
        } catch (error) {
            console.error('Error fetching project list:', error);
            throw new Error('Failed to fetch project list');
        }
    }
}
