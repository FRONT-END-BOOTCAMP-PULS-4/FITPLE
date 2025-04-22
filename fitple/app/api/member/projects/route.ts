import { SbProjectRepository } from '@/back/project/infra/repositories/supabase/SbProjectRepository';
import { SbProjectSkillRepository } from '@/back/project/infra/repositories/supabase/SbProjectSkillRepository';
import { SbProjectImgRepository } from '@/back/project/infra/repositories/supabase/SbProjectImgRepository';
import { SbProjectPositionRepository } from '@/back/project/infra/repositories/supabase/SbProjectPositionRepository'; // 추가된 부분
import { NextResponse } from 'next/server';
import { CreateProjectDto } from '@/back/project/application/usecases/dto/CreateProjectDto';
import { CreateProjectUsecase } from '@/back/project/application/usecases/CreateProjectUsecase';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { title, content, duration, workMode, status, userId, skillIds, imgUrls, positionIds } = body;

        if (
            !title ||
            !content ||
            !duration ||
            !workMode ||
            !status ||
            !userId ||
            !Array.isArray(skillIds) ||
            !skillIds.length ||
            !Array.isArray(positionIds) ||
            !positionIds.length
        ) {
            return NextResponse.json({ error: '필수 항목을 만족하지 못했습니다.' }, { status: 400 });
        }

        const dto: CreateProjectDto = {
            title,
            content,
            duration,
            workMode,
            status,
            userId,
            skills: skillIds,
            positions: positionIds,
            images: imgUrls || null,
        };

        const usecase = new CreateProjectUsecase(
            new SbProjectRepository(),
            new SbProjectSkillRepository(),
            new SbProjectPositionRepository(),
            new SbProjectImgRepository()
        );

        const createdProjectId = await usecase.execute(dto);

        return NextResponse.json(createdProjectId, { status: 201 });
    } catch (error) {
        console.error('Error creating project:', error);
        return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
    }
}
