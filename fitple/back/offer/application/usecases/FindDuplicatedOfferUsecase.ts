import { OfferRepository } from "../../domain/repositories/OfferRepository";

export class FindDuplicatedOfferUsecase {
    constructor(private readonly offerRepository: OfferRepository) {}

    // 상태 업데이트 및 상세 정보 조회
    async execute(introductionId: number, projectId: number): Promise<boolean> {
        try {
            const offer = await this.offerRepository.checkMyOffer(introductionId, projectId);
            console.log("checkMyOffer", offer);
            return offer;
        } catch (error) {
            console.error("Error update offer:", error);
            throw new Error("Failed tot update offer");
        }
    }
}
