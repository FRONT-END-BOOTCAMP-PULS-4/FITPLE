import { SbOfferRepository } from "@/back/offer/infra/repositories/supabase/SbOfferRepository";
import { NextRequest } from "next/server";

export async function PUT(request: NextRequest) {
    try {
        const { offerId, status } = await request.json();

        // 상태가 유효한지 확인
        if (!["waiting", "accept", "reject"].includes(status)) {
            return new Response(JSON.stringify({ error: "Invalid status" }), { status: 400 });
        }

        const repository = new SbOfferRepository();
        await repository.updateStatus(offerId, status);

        return new Response(JSON.stringify({ message: "Status updated successfully" }), { status: 200 });
    } catch (error) {
        if (error instanceof Error) {
            console.error("PUT /api/member/offer Error:", error);
            return new Response(JSON.stringify({ error: error.message }), { status: 500 });
        }
        return new Response(JSON.stringify({ error: "Unknown server error" }), { status: 500 });
    }
}
