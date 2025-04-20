import dayjs from 'dayjs';
import { ProjectRepository } from '../../domain/repositories/ProjectRepository';
import { ProjectDetailDto } from './dto/ProjectDetailDto';

export class ProjectDetailUsecase {
    constructor(private projectDetailRepository: ProjectRepository) {}

    async execute(projectId: number): Promise<ProjectDetailDto> {
        const projectDto = await this.projectDetailRepository.findProjectByIdView(projectId);

        return new ProjectDetailDto(
            projectDto.id,
            projectDto.userId,
            projectDto.title,
            projectDto.content,
            projectDto.duration,
            projectDto.workMode,
            projectDto.status,
            dayjs(projectDto.createdAt).format('YYYY-MM-DD'),
            dayjs(projectDto.updatedAt).format('YYYY-MM-DD'),
            projectDto.imgUrl || [],
            projectDto.likeCount || 0,
            projectDto.skills || [],
            projectDto.user,
            projectDto.positions
        );
    }
}
