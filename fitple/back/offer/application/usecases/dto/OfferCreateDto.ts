import { OfferStatus } from '@/type/common';

export class OfferCreateDto {
    constructor(
        public userId: string,
        public introductionId: number,
        public projectId: number,
        public message: string,
        public status: OfferStatus,
        public createdAt?: string
    ) {}
}
// import { OfferStatus } from '@/type/common';

// export class OfferCreateDto {
//     constructor(
//         public id: number,
//         public userId: string,
//         public introductionId: number,
//         public projectId: number,
//         public message: string,
//         public status: OfferStatus,
//         public createdAt: string
//     )
//     {}
// }
