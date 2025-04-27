import { UpdateIntroductionDto } from "@/back/introduction/application/usecases/dto/UpdateIntroductionDto";
import { UpdateIntroductionUsecase } from "@/back/introduction/application/usecases/UpdateIntroductionUsecase";
import { SbIntroductionImgRepository } from "@/back/introduction/infra/repositories/supabase/SbIntroductionImgRepository";
import { SbIntroductionPositionRepository } from "@/back/introduction/infra/repositories/supabase/SbIntroductionPositionRepository";
import { SbIntroductionRepository } from "@/back/introduction/infra/repositories/supabase/SbIntroductionRepository";
import { SbIntroductionSkillRepository } from "@/back/introduction/infra/repositories/supabase/SbIntroductionSkillRepository";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
/** 로그인한 유저만 접근 가능한 페이지 */

interface RequestParams {
    params: Promise<{
        id: string;
    }>;
}

export async function PUT(req: Request, { params }: RequestParams) {
    try {
        const { id: introductionId } = await params;
        const body = await req.json();
        const { title, content, workMode, status, skillIds, imgUrls, positionIds } = body;

        if (
            !title ||
            !content ||
            !workMode ||
            !status ||
            !Array.isArray(skillIds) ||
            !skillIds.length ||
            !Array.isArray(positionIds) ||
            !positionIds.length
        ) {
            return NextResponse.json({ error: "필수 항목을 만족하지 못했습니다." }, { status: 400 });
        }

        const dto: UpdateIntroductionDto = {
            id: Number(introductionId),
            title,
            content,
            workMode,
            status,
            skills: skillIds,
            positions: positionIds,
            images: imgUrls || [],
        };

        const usecase = new UpdateIntroductionUsecase(
            new SbIntroductionRepository(),
            new SbIntroductionSkillRepository(),
            new SbIntroductionPositionRepository(),
            new SbIntroductionImgRepository()
        );

        await usecase.execute(dto);

        return NextResponse.json({ message: "게시글이 성공적으로 수정되었습니다." }, { status: 200 });
    } catch (error) {
        console.error("Error updating introduction:", error);
        return NextResponse.json({ error: "게시글 수정에 실패했습니다." }, { status: 500 });
    }
}

export async function DELETE(_: Request, { params }: RequestParams) {
    try {
        const { id: introductionId } = await params;

        if (!introductionId) {
            return NextResponse.json({ error: "게시글 id는 필수항목 입니다." }, { status: 400 });
        }

        const introductionRepository = new SbIntroductionRepository();
        await introductionRepository.deleteIntroduction(Number(introductionId));

        return NextResponse.json({ message: "게시글이 성공적으로 삭제되었습니다." }, { status: 200 });
    } catch (error) {
        console.error("Error deleting introduction:", error);
        return NextResponse.json({ error: "Failed to delete introduction" }, { status: 500 });
    }
}

export async function GET(req: Request, { params }: RequestParams) {
    try {
        const authHeader = req.headers.get("Authorization");
        if (!authHeader || !authHeader.startsWith("Bearer")) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, process.env.SECRET_KEY!) as jwt.JwtPayload;
        const { id: introductionId } = await params;

        const userId = decoded.id;

        if (!introductionId) {
            return NextResponse.json({ error: "프로젝트 id는 필수항목 입니다." }, { status: 400 });
        }

        const introductionRepository = new SbIntroductionRepository();
        const introduction = await introductionRepository.checkMyIntroduction(userId, Number(introductionId));

        return NextResponse.json(introduction, { status: 200 });
    } catch (error) {
        console.error("Error fetching introduction:", error);
        return NextResponse.json({ error: "Failed to fetch introduction" }, { status: 500 });
    }
}
