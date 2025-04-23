import dayjs from 'dayjs';
import { LikeRepository } from '../../domian/repositories/LikeRepository';
import { LikeProjectDto } from './dto/LikeProjectDto';

export class GetLikeProjectListUsecase {
    constructor(private likeProjectRepository: LikeRepository) {}

    async execute(userId: string): Promise<LikeProjectDto[]> {
        try {
            const likeProjectList = await this.likeProjectRepository.findAll(userId);

            return likeProjectList.map(
                (like) =>
                    new LikeProjectDto(
                        like.id,
                        like.projectId,
                        like.userId,
                        dayjs(like.createdAt).format('YYYY-MM-DD'),
                        like.project.map((p) => ({
                            id: p.id,
                            userId: p.userId,
                            title: p.title,
                            content: p.content,
                            duration: p.duration,
                            status: p.status,
                            workMode: p.workMode,
                            createdAt: dayjs(p.createdAt).format('YYYY-MM-DD'),
                            updatedAt: dayjs(p.updatedAt).format('YYYY-MM-DD'),
                        }))
                    )
            );
        } catch (error) {
            console.error('Error fetching like project list:', error);
            throw new Error('Failed to fetch like project list');
        }
    }
}
