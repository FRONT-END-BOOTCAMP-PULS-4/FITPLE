import { FindReceivedOfferListUsecase } from "@/back/offer/application/usecases/FindReceivedOfferListUsecase";
import { SbOfferRepository } from "@/back/offer/infra/repositories/supabase/SbOfferRepository";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const userId = "e386c006-40bd-477d-8e33-9ad70fe2214a";
        const offerRepository = new SbOfferRepository();

        const findReceivedOfferListUsecase = new FindReceivedOfferListUsecase(offerRepository);

        const applyApplicantView = await findReceivedOfferListUsecase.execute(userId);

        return NextResponse.json(applyApplicantView, { status: 200 });
    } catch (error) {
        console.error("Error fetching project detail:", error);
        return NextResponse.json({ error: "Failed to fetch project detail" }, { status: 500 });
    }
}
