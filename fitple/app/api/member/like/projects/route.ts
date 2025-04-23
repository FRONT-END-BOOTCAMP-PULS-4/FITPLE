import { GetLikeProjectListUsecase } from '@/back/like/application/usecases/GetLikeProjectListUsecase';
import { SbLikeRepository } from '@/back/like/infra/repositories/supabase/SbLikeRepository';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    try {
        const authHeader = req.headers.get('authorization');

        if (!authHeader) {
            return NextResponse.json({ error: 'Authorization header missing' }, { status: 401 });
        }

        const token = authHeader.split(' ')[1];

        const payload = JSON.parse(atob(token.split('.')[1]));
        const userId = payload.sub;

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
