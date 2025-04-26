import dayjs from "dayjs";
import { SbOfferRepository } from "../../infra/repositories/supabase/SbOfferRepository";
import { OfferListDto } from "./dto/OfferListDto";

export class FindSentOfferListUsecase {
    constructor(private readonly offerRepository: SbOfferRepository) {}

    async execute(userId: string): Promise<OfferListDto[]> {
        const offers = await this.offerRepository.findSentOfferList(userId);

        return offers.map(
            (offer) =>
                new OfferListDto(
                    "offer",
                    offer.id,
                    offer.userId,
                    offer.projectId,
                    offer.introductionId,
                    offer.message,
                    offer.status,
                    dayjs(offer.createdAt).format("YYYY-MM-DD"),
                    offer.project.title!,
                    offer.nickname,
                    offer.avatarUrl || "/images/test-team.png"
                )
        );
    }
}
