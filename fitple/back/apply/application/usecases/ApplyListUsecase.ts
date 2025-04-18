import { ApplyRepository } from '../../domain/repositories/ApplyRepository';

import { ApplyListDto } from './dto/ApplyListDto';

export class ApplyListUsecase {
    constructor(private readonly applyRepository: ApplyRepository) {}

    async execute(id: number): Promise<ApplyListDto> {
        const apply = await this.applyRepository.findById(id);

        return {
            userId: apply.user_id,
            projectId: apply.project_id,
            message: apply.message,
            status: apply.status,
            createdAt: apply.created_at,
        };
    }
}
