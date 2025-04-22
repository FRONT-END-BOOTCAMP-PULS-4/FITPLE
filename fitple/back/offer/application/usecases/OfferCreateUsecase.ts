import { Offer } from "@/back/offer/domain/entities/Offer";
import { OfferRepository } from "@/back/offer/domain/repositories/OfferRepository";
import { OfferCreateDto } from "./dto/OfferCreateDto";

export class OfferCreateUsecase {
    constructor(private readonly offerRepository: OfferRepository) {}

    async execute(offerDto: OfferCreateDto): Promise<Offer> {
        const offer = new Offer( offerDto.id, offerDto.userId, offerDto.projectId, offerDto.introductionId, offerDto.message, offerDto.status, offerDto.createdAt);

        return await this.offerRepository.save(offer);
    }
}