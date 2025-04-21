import { SbProjectRepository } from '@/back/project/infra/repositories/supabase/SbProjectRepository';
import { SbProjectSkillRepository } from '@/back/project/infra/repositories/supabase/SbProjectSkillRepository';
import { SbProjectImgRepository } from '@/back/project/infra/repositories/supabase/SbProjectImgRepository';
import { SbProjectPositionRepository } from '@/back/project/infra/repositories/supabase/SbProjectPositionRepository'; // 추가된 부분
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { title, content, duration, workMode, status, userId, skillIds, imgUrls, positionIds } = body;

        // 필수 항목 체크
        if (
            !title ||
            !content ||
            !duration ||
            !workMode ||
            !status ||
            !userId ||
            !skillIds ||
            !skillIds.length ||
            !positionIds ||
            !positionIds.length
        ) {
            return NextResponse.json({ error: '필수 항목을 만족하지 못했습니다.' }, { status: 400 });
        }

        // 프로젝트 생성 데이터
        const newProject = { title, content, duration, workMode, status, userId };

        const projectRepository = new SbProjectRepository();
        const createdProject = await projectRepository.createProject(newProject);

        // 기술 정보 삽입
        const projectSkillRepository = new SbProjectSkillRepository();
        await projectSkillRepository.createProjectSkills(createdProject.id, skillIds);

        // 직무 정보 삽입
        const projectPositionRepository = new SbProjectPositionRepository();
        await projectPositionRepository.createProjectPositions(createdProject.id, positionIds);

        // 이미지가 있을 경우에만 저장
        if (imgUrls && imgUrls.length > 0) {
            const projectImgRepository = new SbProjectImgRepository();
            await projectImgRepository.createProjectImages(createdProject.id, imgUrls);
        }

        return NextResponse.json(createdProject, { status: 201 });
    } catch (error) {
        console.error('Error creating project:', error);
        return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
    }
}
