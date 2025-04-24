import { IntroductionListDto } from '@/back/introduction/application/usecases/dto/IntroductionListDto';
import GetIntroductionListUsecase from '@/back/introduction/application/usecases/GetIntroductionListUsecase';
import { SbIntroductionRepository } from '@/back/introduction/infra/repositories/supabase/SbIntroductionRepository';
import { NextResponse } from 'next/server';

/** 누구나 접근 가능한 페이지 */

export async function GET() {
    try {
        const introductionListRepository = new SbIntroductionRepository();

        const getIntroductionListUsecase = new GetIntroductionListUsecase(introductionListRepository);

        const introductionDto: IntroductionListDto[] = await getIntroductionListUsecase.execute();

        return NextResponse.json(introductionDto, { status: 200 });
    } catch (error) {
        console.error('Error fetching introduction detail:', error);
        return NextResponse.json({ error: 'Failed to fetch introduction detail' }, { status: 500 });
    }
}
