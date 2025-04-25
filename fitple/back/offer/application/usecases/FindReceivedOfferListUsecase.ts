import dayjs from "dayjs";
import { SbOfferRepository } from "../../infra/repositories/supabase/SbOfferRepository";
import { OfferListDto } from "./dto/OfferListDto";

export class FindReceivedOfferListUsecase {
    constructor(private readonly offerRepository: SbOfferRepository) {}

    async execute(userId: string): Promise<OfferListDto[]> {
        const myIntroductionIds = await this.offerRepository.findMyIntroductionIds(userId);
        const offers = await this.offerRepository.findReceivedOfferList(myIntroductionIds);

        return offers.map(
            (offer) =>
                new OfferListDto(
                    offer.id,
                    offer.userId,
                    offer.projectId,
                    offer.introductionId,
                    offer.message,
                    offer.status,
                    dayjs(offer.createdAt).format("YYYY-MM-DD"),
                    offer.project.title!
                )
        );
    }
}
