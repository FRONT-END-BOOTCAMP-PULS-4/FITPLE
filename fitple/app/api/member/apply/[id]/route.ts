import { SbApplyRepository } from "@/back/apply/infra/repositories/supabase/SbApplyRepository";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { ApplyApplicantUsecase } from "@/back/apply/application/usecases/ApplyApplicantUsecase";
export async function GET(req: Request) {
    try {
        const authHeader = req.headers.get("Authorization");
        if (!authHeader || !authHeader.startsWith("Bearer")) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, process.env.SECRET_KEY!) as jwt.JwtPayload;

        const applyRepository = new SbApplyRepository();

        const applyApplicantsUsecase = new ApplyApplicantUsecase(applyRepository);

        const applyApplicantView = await applyApplicantsUsecase.execute(decoded.id);

        return NextResponse.json(applyApplicantView, { status: 200 });
    } catch (error) {
        console.error("Error fetching project detail:", error);
        return NextResponse.json({ error: "Failed to fetch project detail" }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        const { applyId, status } = await request.json();

        // 상태가 유효한지 확인
        if (!["waiting", "accept", "reject"].includes(status)) {
            return new Response(JSON.stringify({ error: "Invalid status" }), { status: 400 });
        }

        const repository = new SbApplyRepository();
        await repository.updateStatus(applyId, status);

        return new Response(JSON.stringify({ message: "Status updated successfully" }), { status: 200 });
    } catch (error) {
        if (error instanceof Error) {
            console.error("PUT /api/member/apply Error:", error);
            return new Response(JSON.stringify({ error: error.message }), { status: 500 });
        }
        return new Response(JSON.stringify({ error: "Unknown server error" }), { status: 500 });
    }
}
