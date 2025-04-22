import { OfferStatus } from '@/type/common';

export class OfferUpdateDto {
    constructor(
        public userId: string,
        public projectId: number,
        public introductionId: number,
        public message: string,
        public status: OfferStatus,
        public createdAt: string
    ) {}
}
