import { ApplyRepository } from '../../domain/repositories/ApplyRepository';
import { ApplyStatus } from '@/type/common';
import { ApplyUpdateDto } from './dto/ApplyUpdateDto';

export class ApplyUpdateUsecase {
    constructor(private readonly applyRepository: ApplyRepository) {}

    // 상태 업데이트 및 상세 정보 조회
    async execute(id: number, status: ApplyStatus): Promise<void> {
        try {
            const apply = await this.applyRepository.updateStatus(id, status);
            return apply;
        } catch (error) {
            console.error('Error update apply:', error);
            throw new Error('Failed tot update apply');
        }
    }
}
