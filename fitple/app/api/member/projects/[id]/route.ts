import { SbProjectImgRepository } from '@/back/project/infra/repositories/supabase/SbProjectImgRepository';
import { SbProjectPositionRepository } from '@/back/project/infra/repositories/supabase/SbProjectPositionRepository';
import { SbProjectRepository } from '@/back/project/infra/repositories/supabase/SbProjectRepository';
import { SbProjectSkillRepository } from '@/back/project/infra/repositories/supabase/SbProjectSkillRepository';
import { NextResponse } from 'next/server';

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

        const { title, content, duration, workMode, status, positionIds, skillIds, imgUrls } = body;

        // 필수 항목 체크 (타이틀, 콘텐츠, 기간, 근무모드, 상태만 확인하고, 나머지 항목은 없으면 건너뛰기)
        if (!title || !content || !duration || !workMode || !status) {
            return NextResponse.json({ error: '필수 항목을 만족하지 못했습니다.' }, { status: 400 });
        }

        // 프로젝트 수정 데이터 생성 (전달된 필드만 수정)
        const updatedProject = {
            id: Number(projectId),
            title,
            content,
            duration,
            workMode,
            status,
        };

        const projectRepository = new SbProjectRepository();
        const positionRepository = new SbProjectPositionRepository();
        const skillRepository = new SbProjectSkillRepository();
        const imgRepository = new SbProjectImgRepository();

        // 프로젝트 본문 수정 (타이틀, 콘텐츠, 기간, 근무모드, 상태만 수정)
        const result = await projectRepository.updateProject(updatedProject);

        // 포지션 업데이트
        if (positionIds && positionIds.length > 0) {
            await positionRepository.updateProjectPositions(Number(projectId), positionIds);
        }

        // 기술 스택 업데이트
        if (skillIds && skillIds.length > 0) {
            await skillRepository.updateProjectSkills(Number(projectId), skillIds);
        }

        // 이미지 업데이트
        if (imgUrls && imgUrls.length > 0) {
            await imgRepository.updateProjectImages(Number(projectId), imgUrls);
        }

        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        console.error('Error updating project:', error);
        return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
    }
}

export async function DELETE(_: Request, { params }: RequestParams) {
    try {
        const { id: projectId } = await params;

        if (!projectId) {
            return NextResponse.json({ error: '프로젝트 id는 필수항목 입니다.' }, { status: 400 });
        }

        const projectRepository = new SbProjectRepository();
        await projectRepository.deleteProject(Number(projectId));

        return NextResponse.json({ message: '프로젝트가 성공적으로 삭제되었습니다.' }, { status: 200 });
    } catch (error) {
        console.error('Error deleting project:', error);
        return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
    }
}
