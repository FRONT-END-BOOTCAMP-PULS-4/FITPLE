import { OfferStatus } from "@/type/common";
import { OfferUpdateDto } from "./dto/OfferUpdateDto";
import { OfferRepository } from "../../domain/repositories/OfferRepository";

export class OfferUpdateUsecase {
    constructor(private readonly offerRepository: OfferRepository) {}

    // 상태 업데이트 및 상세 정보 조회
    async execute(id: number, status: OfferStatus): Promise<OfferUpdateDto> {
        // 먼저 해당 지원 요청을 찾아옵니다.
        const offer = await this.offerRepository.findById(id);
        // 상태 업데이트
        await this.offerRepository.updateStatus(id, status);

        // 상태가 업데이트된 후, 업데이트된 offer를 반환합니다.
        return {
            userId: offer.userId,
            projectId: offer.projectId,
            introductionId: offer.introductionId,
            message: offer.message,
            status: status, // 업데이트된 상태를 반환
            createdAt: offer.createdAt,
        };
    }
}