import { FindDuplicatedOfferUsecase } from "@/back/offer/application/usecases/FindDuplicatedOfferUsecase";
import { SbOfferRepository } from "@/back/offer/infra/repositories/supabase/SbOfferRepository";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);

        const introductionId = searchParams.get("introductionId");
        const projectId = searchParams.get("projectId");

        const repository = new SbOfferRepository();
        const usecase = new FindDuplicatedOfferUsecase(repository);
        const result = await usecase.execute(Number(introductionId), Number(projectId));

        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        console.error("[GET /api/member/offer/check] error:", error);
        return NextResponse.json({ error: "Failed to fetch offer list" }, { status: 500 });
    }
}
