import dayjs from 'dayjs';
import { ProjectRepository } from '@/back/project/domain/repositories/ProjectRepository';
import { ProjectDetailDto } from './dto/ProjectDetailDto';

export class GetProjectDetailUsecase {
    constructor(private projectRepository: ProjectRepository) {}

    async execute(projectId: number): Promise<ProjectDetailDto> {
        const project = await this.projectRepository.findById(projectId);

        return new ProjectDetailDto(
            project.id,
            project.title,
            project.content,
            project.duration,
            project.workMode,
            project.status,
            dayjs(project.createdAt).format('YYYY-MM-DD'),
            dayjs(project.updatedAt).format('YYYY-MM-DD'),
            project.images?.map((img) => img.imgUrl) || [],
            project.likes.length,
            project.skills.map((skill) => ({
                id: skill.id,
                name: skill.skillName,
            })),
            project.positions.map((position) => ({
                id: position.id,
                name: position.positionName,
            })),
            {
                nickname: project.user.nickname,
                avatarUrl: project.user.avatarUrl ?? null,
                career: project.user.career,
            }
        );
    }
}
