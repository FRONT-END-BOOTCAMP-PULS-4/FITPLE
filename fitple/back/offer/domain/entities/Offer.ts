import { OfferStatus } from '@/type/common';
export class Offer {
    constructor(
        public id: number,
        public userId: string,
        public projectId: number,
        public introductionId: number,
        public message: string,
        public status: OfferStatus,
        public createdAt: string
    )
    {}
}