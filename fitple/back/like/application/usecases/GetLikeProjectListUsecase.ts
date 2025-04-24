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
                    new LikeProjectDto(like.id, dayjs(like.createdAt).format('YYYY-MM-DD'), {
                        id: like.project.id,
                        userId: like.project.userId,
                        title: like.project.title,
                        content: like.project.content,
                        duration: like.project.duration,
                        status: like.project.status,
                        workMode: like.project.workMode,
                        createdAt: dayjs(like.project.createdAt).format('YYYY-MM-DD'),
                        updatedAt: dayjs(like.project.updatedAt).format('YYYY-MM-DD'),
                    })
            );
        } catch (error) {
            console.error('Error fetching like project list:', error);
            throw new Error('Failed to fetch like project list');
        }
    }
}
