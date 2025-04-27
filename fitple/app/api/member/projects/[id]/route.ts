import { UpdateProjectDto } from "@/back/project/application/usecases/dto/UpdateProjectDto";
import { UpdateProjectUsecase } from "@/back/project/application/usecases/UpdateProjectUsecase";
import { SbProjectImgRepository } from "@/back/project/infra/repositories/supabase/SbProjectImgRepository";
import { SbProjectPositionRepository } from "@/back/project/infra/repositories/supabase/SbProjectPositionRepository";
import { SbProjectRepository } from "@/back/project/infra/repositories/supabase/SbProjectRepository";
import { SbProjectSkillRepository } from "@/back/project/infra/repositories/supabase/SbProjectSkillRepository";
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
        const { id: projectId } = await params;
        const body = await req.json();
        const { title, content, duration, workMode, status, skillIds, imgUrls, positionIds } = body;

        if (
            !title ||
            !content ||
            !duration ||
            !workMode ||
            !status ||
            !Array.isArray(skillIds) ||
            !skillIds.length ||
            !Array.isArray(positionIds) ||
            !positionIds.length
        ) {
            return NextResponse.json({ error: "필수 항목을 만족하지 못했습니다." }, { status: 400 });
        }

        const dto: UpdateProjectDto = {
            id: Number(projectId),
            title,
            content,
            duration,
            workMode,
            status,
            skills: skillIds,
            positions: positionIds,
            images: imgUrls || [],
        };

        const usecase = new UpdateProjectUsecase(
            new SbProjectRepository(),
            new SbProjectSkillRepository(),
            new SbProjectPositionRepository(),
            new SbProjectImgRepository()
        );

        await usecase.execute(dto);

        return NextResponse.json({ message: "프로젝트가 성공적으로 수정되었습니다." }, { status: 200 });
    } catch (error) {
        console.error("Error updating project:", error);
        return NextResponse.json({ error: "프로젝트 수정에 실패했습니다." }, { status: 500 });
    }
}

export async function DELETE(_: Request, { params }: RequestParams) {
    try {
        const { id: projectId } = await params;

        if (!projectId) {
            return NextResponse.json({ error: "프로젝트 id는 필수항목 입니다." }, { status: 400 });
        }

        const projectRepository = new SbProjectRepository();
        await projectRepository.deleteProject(Number(projectId));

        return NextResponse.json({ message: "프로젝트가 성공적으로 삭제되었습니다." }, { status: 200 });
    } catch (error) {
        console.error("Error deleting project:", error);
        return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
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
        const { id: projectId } = await params;

        const userId = decoded.id;

        if (!projectId) {
            return NextResponse.json({ error: "프로젝트 id는 필수항목 입니다." }, { status: 400 });
        }

        const projectRepository = new SbProjectRepository();
        const project = await projectRepository.checkMyProject(userId, Number(projectId));

        return NextResponse.json(project, { status: 200 });
    } catch (error) {
        console.error("Error fetching project:", error);
        return NextResponse.json({ error: "Failed to fetch project" }, { status: 500 });
    }
}
