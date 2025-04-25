import { NextResponse } from 'next/server';
import { CreateIntroductiontDto } from '@/back/introduction/application/usecases/dto/CreateIntroductionDto';
import { SbIntroductionRepository } from '@/back/introduction/infra/repositories/supabase/SbIntroductionRepository';
import { SbIntroductionSkillRepository } from '@/back/introduction/infra/repositories/supabase/SbIntroductionSkillRepository';
import { CreateIntroductionUsecase } from '@/back/introduction/application/usecases/CreateIntroductionUsecase';
import { SbIntroductionPositionRepository } from '@/back/introduction/infra/repositories/supabase/SbIntroductionPositionRepository';
import { SbIntroductionImgRepository } from '@/back/introduction/infra/repositories/supabase/SbIntroductionImgRepository';
import jwt from 'jsonwebtoken';

export async function POST(req: Request) {
    try {
        const authHeader = req.headers.get('Authorization');
        if (!authHeader || !authHeader.startsWith('Bearer')) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        const token = authHeader.split(' ')[1];

        const decoded = jwt.verify(token, process.env.SECRET_KEY!) as jwt.JwtPayload;

        if (!decoded.id) {
            return NextResponse.json({ error: 'Unauthorized: user ID missing' }, { status: 401 });
        }

        const userId = decoded.id;

        const body = await req.json();
        const { title, content, workMode, status, skillIds, imgUrls, positionIds } = body;

        if (
            !title ||
            !content ||
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

        const dto: CreateIntroductiontDto = {
            title,
            content,
            workMode,
            status,
            userId,
            skills: skillIds,
            positions: positionIds,
            images: imgUrls || null,
        };

        const usecase = new CreateIntroductionUsecase(
            new SbIntroductionRepository(),
            new SbIntroductionSkillRepository(),
            new SbIntroductionPositionRepository(),
            new SbIntroductionImgRepository()
        );

        const createdIntroductionId = await usecase.execute(dto);

        return NextResponse.json(createdIntroductionId, { status: 201 });
    } catch (error) {
        console.error('Error creating introduction:', error);
        return NextResponse.json({ error: 'Failed to create introduction' }, { status: 500 });
    }
}
