import { SbApplyRepository } from "@/back/apply/infra/repositories/supabase/SbApplyRepository";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { FindMyApplyListUsecase } from "@/back/apply/application/usecases/FindMyApplyListUsecase";
export async function GET(req: Request) {
    try {
        const authHeader = req.headers.get("Authorization");
        if (!authHeader || !authHeader.startsWith("Bearer")) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, process.env.SECRET_KEY!) as jwt.JwtPayload;

        const applyRepository = new SbApplyRepository();

        const findMyApplyListUsecase = new FindMyApplyListUsecase(applyRepository);

        const applyApplicantView = await findMyApplyListUsecase.execute(decoded.id);

        return NextResponse.json(applyApplicantView, { status: 200 });
    } catch (error) {
        console.error("Error fetching project detail:", error);
        return NextResponse.json({ error: "Failed to fetch project detail" }, { status: 500 });
    }
}
