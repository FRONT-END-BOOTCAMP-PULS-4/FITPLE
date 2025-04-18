import { ApplyRepository } from '@/back/apply/domain/repositories/ApplyRepository';
import { Apply } from '@/back/apply/domain/entities/Apply';
import { ApplyCreateDto } from './dto/ApplyCreateDto';

export class ApplyCreateUsecase {
    constructor(private readonly applyRepository: ApplyRepository) {}

    async execute(applyDto: ApplyCreateDto): Promise<Apply> {
        // const createdAt = new Date(applyDto.createdAt);
        const apply = new Apply(applyDto.userId, applyDto.projectId, applyDto.message, applyDto.status);

        return await this.applyRepository.save(apply);
    }
}
