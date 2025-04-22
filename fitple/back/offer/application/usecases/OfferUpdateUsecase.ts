import { OfferStatus } from '@/type/common';
import { OfferUpdateDto } from './dto/OfferUpdateDto';
import { OfferRepository } from '../../domain/repositories/OfferRepository';

export class OfferUpdateUsecase {
    constructor(private readonly offerRepository: OfferRepository) {}

    // 상태 업데이트 및 상세 정보 조회
    async execute(id: number, status: OfferStatus): Promise<void> {
        try {
            const offer = await this.offerRepository.updateStatus(id, status);
            return offer;
        } catch (error) {
            console.error('Error update offer:', error);
            throw new Error('Failed tot update offer');
        }
    }
}
