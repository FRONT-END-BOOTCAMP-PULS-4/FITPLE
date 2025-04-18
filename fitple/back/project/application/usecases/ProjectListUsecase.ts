import { ProjectRepository } from '../../domain/repositories/ProjectRepository';
import { ProjectListDto } from './dto/ProjectListDto';

export default class ProjectListUsecase {
    private projectRepository: ProjectRepository;

    constructor(menuRepository: ProjectRepository) {
        this.projectRepository = menuRepository;
    }

    async execute() {
        try {
            const projectList = await this.projectRepository.findAllProjectList();

            const projectListDto: ProjectListDto = {
                projectList: projectList.map((pro) => ({
                    id: pro.id,
                    userId: pro.user_id,
                    title: pro.title,
                    content: pro.content,
                    duration: pro.duration,
                    workMode: pro.work_mode,
                    status: pro.status,
                    createdAt: pro.created_at,
                    updatedAt: pro.updated_at,
                })),
            };

            return projectListDto;
        } catch (error) {
            console.error('Error fetching menus:', error);
            throw new Error('Failed to fetch menus');
        }
    }
}
