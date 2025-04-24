import { GetLikeProjectListUsecase } from '@/back/like/application/usecases/GetLikeProjectListUsecase';
import { SbLikeRepository } from '@/back/like/infra/repositories/supabase/SbLikeRepository';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        /** 나중에 user_id 를 header 로 받으면 될듯 */
        const userId = 'fbb321b6-2dab-4aa9-8c02-290e6c7fb0b3';
        console.log('userId:', userId);

        const projectLikeRepository = new SbLikeRepository();

        const getProjectLikeListUsecase = new GetLikeProjectListUsecase(projectLikeRepository);

        const projectLikeDto = await getProjectLikeListUsecase.execute(userId);

        return NextResponse.json(projectLikeDto, { status: 201 });
    } catch (error) {
        console.error('Error fetching liked projects:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
