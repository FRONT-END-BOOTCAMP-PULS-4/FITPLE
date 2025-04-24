import { LikeRepository } from '../../domian/repositories/LikeRepository';

export class GetLikeProjectUsecase {
    constructor(private likeProjectRepository: LikeRepository) {}

    async execute(projectId: number, userId: string): Promise<boolean> {
        const projectLike = await this.likeProjectRepository.findById(projectId, userId);

        console.log(11, projectLike);

        return !!projectLike;
    }
}
