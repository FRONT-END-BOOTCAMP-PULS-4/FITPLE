import dayjs from 'dayjs';
import { Apply } from '../../domain/entities/Apply';
import { ApplyRepository } from '../../domain/repositories/ApplyRepository';
import { ApplyCreateDto } from './dto/ApplyCreateDto';

export class ApplyCreateUsecase {
    constructor(private applyRepository: ApplyRepository) {}

    async execute(applyDto: ApplyCreateDto): Promise<Apply> {
        try {
            const apply = await this.applyRepository.save(applyDto);

            if (!apply) throw new Error('apply not found');

            const applypost = {
                id: apply.id,
                userId: apply.userId,
                projectId: apply.projectId,
                message: apply.message,
                status: apply.status,
            };

            return applypost;
        } catch (error) {
            console.error('Error: ', error);
            throw new Error('Failed to create apply');
        }
    }
}
