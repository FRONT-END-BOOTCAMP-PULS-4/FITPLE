import { Project } from "@/back/project/domain/entities/Project";
import { OfferStatus } from "@/type/common";
import { Offer } from "./Offer";
import { Introduction } from "@/back/introduction/domain/entities/Introduction";

export class OfferView extends Offer {
    constructor(
        id: number,
        userId: string,
        projectId: number,
        introductionId: number,
        message: string,
        status: OfferStatus,
        createdAt: Date,
        public project: Partial<Project>,
        public introduction: Partial<Introduction>,
        public nickname: string,
        public avatarUrl: string
    ) {
        super(id, userId, projectId, introductionId, message, status, createdAt);
    }
}
