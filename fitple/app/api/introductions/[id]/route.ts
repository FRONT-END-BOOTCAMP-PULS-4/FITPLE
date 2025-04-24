import { IntroductionDetailDto } from '@/back/introduction/application/usecases/dto/IntroductionDetailDto';
import { GetIntroductionDetailUsecase } from '@/back/introduction/application/usecases/GetIntroductionDetailUsecase';
import { SbIntroductionRepository } from '@/back/introduction/infra/repositories/supabase/SbIntroductionRepository';
import { NextResponse } from 'next/server';

interface RequestParams {
    params: Promise<{
        id: string;
    }>;
}

/** 누구나 접근 가능한 페이지 */

export async function GET(request: Request, { params }: RequestParams) {
    const { id: introductionId } = await params;

    if (!introductionId) {
        return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    try {
        const introductionRepository = new SbIntroductionRepository();

        const getIntroductionDetailUsecase = new GetIntroductionDetailUsecase(introductionRepository);

        const introductionDetailDto: IntroductionDetailDto = await getIntroductionDetailUsecase.execute(
            Number(introductionId)
        );

        return NextResponse.json(introductionDetailDto, { status: 200 });
    } catch (error) {
        console.error('Error fetching introduction detail:', error);
        return NextResponse.json({ error: 'Failed to fetch introduction detail' }, { status: 500 });
    }
}
