import { FindDuplicatedApplyUsecase } from "@/back/apply/application/usecases/FindDuplicatedApplyUsecase";
import { SbApplyRepository } from "@/back/apply/infra/repositories/supabase/SbApplyRepository";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);

        const projectId = searchParams.get("projectId");

        const authHeader = req.headers.get("Authorization");
        if (!authHeader || !authHeader.startsWith("Bearer")) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, process.env.SECRET_KEY!) as jwt.JwtPayload;
        if (!decoded.id) {
            return NextResponse.json({ error: "Unauthorized: user ID missing" }, { status: 401 });
        }

        const userId = decoded.id;
        const repository = new SbApplyRepository();
        const usecase = new FindDuplicatedApplyUsecase(repository);
        const result = await usecase.execute(userId, Number(projectId));

        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        console.error("[GET /api/member/apply/check] error:", error);
        return NextResponse.json({ error: "Failed to fetch apply list" }, { status: 500 });
    }
}
