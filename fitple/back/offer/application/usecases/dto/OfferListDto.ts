import { OfferStatus } from "@/type/common";

export class OfferListDto {
    constructor(
        public type: "offer",
        public id: number,
        public userId: string,
        public projectId: number,
        public introductionId: number,
        public message: string,
        public status: OfferStatus,
        public createdAt: string,
        public title: string,
        public nickname: string,
        public avatarUrl: string
    ) {}
}
