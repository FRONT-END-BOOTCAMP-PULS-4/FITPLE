import { ApplyCreateUsecase } from '@/back/apply/application/usecases/ApplyCreateUsecase';
import { ApplyDetailUsecase } from '@/back/apply/application/usecases/ApplyDetailUsecase';
import { ApplyCreateDto } from '@/back/apply/application/usecases/dto/ApplyCreateDto';
import { ApplyDetailDto } from '@/back/apply/application/usecases/dto/ApplyDetailDto';
import { SbApplyRepository } from '@/back/apply/infra/repositories/supabase/SbApplyRepository';
import { ApplyStatus } from '@/type/common';
import { NextRequest } from 'next/server';

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const idParam = url.searchParams.get('id'); // ?id=123 이런 식으로 받아올 때
        if (!idParam) {
            return new Response('Missing apply ID', { status: 400 });
        }

        const applyId = parseInt(idParam, 10);
        const applyRepository = new SbApplyRepository();
        const applyDetailUsecase = new ApplyDetailUsecase(applyRepository);
        const applyDetailDto: ApplyDetailDto = await applyDetailUsecase.execute(applyId);

        return new Response(JSON.stringify(applyDetailDto), { status: 200 });
    } catch (error) {
        return new Response('Internal Server Error', { status: 500 });
    }
}
export async function POST(request: NextRequest) {
    console.log('request:', request);
    const { message } = request.body;
    console.log('message:', message);
    // try {
    //     const body = await request.json();
    //     const { userId, projectId, message, status } = body;
    //     // 유효성 검사
    //     if (!userId || !projectId || !message) {
    //         return new Response(JSON.stringify({ error: 'Missing required fields' }), {
    //             status: 400,
    //         });
    //     }
    //     const dto = new ApplyCreateDto(userId, projectId, message, status);
    //     console.log(dto);
    //     const repository = new SbApplyRepository();
    //     const usecase = new ApplyCreateUsecase(repository);
    //     const result = await usecase.execute(dto);
    //     return new Response(JSON.stringify(result), {
    //         status: 201,
    //     });
    // } catch (error: any) {
    //     return new Response(JSON.stringify({ error: error.message || 'Server error' }), {
    //         status: 500,
    //     });
    // }
}
