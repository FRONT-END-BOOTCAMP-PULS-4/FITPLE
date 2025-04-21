import { ApplyCreateUsecase } from '@/back/apply/application/usecases/ApplyCreateUsecase';
import { ApplyDetailUsecase } from '@/back/apply/application/usecases/ApplyDetailUsecase';
import { ApplyCreateDto } from '@/back/apply/application/usecases/dto/ApplyCreateDto';
import { ApplyDetailDto } from '@/back/apply/application/usecases/dto/ApplyDetailDto';
import { SbApplyRepository } from '@/back/apply/infra/repositories/supabase/SbApplyRepository';
import { NextRequest } from 'next/server';

// GET /api/member/apply?id=1
export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const idParam = url.searchParams.get('id');

        if (!idParam) {
            return new Response(JSON.stringify({ error: 'Missing apply ID' }), { status: 400 });
        }

        const applyId = parseInt(idParam, 10);
        const repository = new SbApplyRepository();
        const usecase = new ApplyDetailUsecase(repository);
        const result: ApplyDetailDto = await usecase.execute(applyId);

        return new Response(JSON.stringify(result), { status: 200 });
    } catch (error) {
        if (error instanceof Error) {
            return new Response(JSON.stringify({ error: error.message }), { status: 500 });
        }
        return new Response(JSON.stringify({ error: 'Unknown server error' }), { status: 500 });
    }
}

// POST /api/member/apply
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { id, userId, projectId, message, status, createdAt } = body;
        if (!userId || !projectId || !message) {
            return new Response(JSON.stringify({ error: 'Missing required fields' }), {
                status: 400,
            });
        }

        const dto = new ApplyCreateDto(id, userId, projectId, message, status, createdAt);
        const repository = new SbApplyRepository();
        const usecase = new ApplyCreateUsecase(repository);
        const result = await usecase.execute(dto);

        return new Response(JSON.stringify(result), { status: 201 });
    } catch (error) {
        if (error instanceof Error) {
            console.error('POST /api/member/apply Error:', error);
            return new Response(JSON.stringify({ error: error.message }), { status: 500 });
        }
        return new Response(JSON.stringify({ error: 'Unknown server error' }), { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        const { applyId, status } = await request.json();

        // 상태가 유효한지 확인
        if (!['waiting', 'accept', 'reject'].includes(status)) {
            return new Response(JSON.stringify({ error: 'Invalid status' }), { status: 400 });
        }

        const repository = new SbApplyRepository();
        await repository.updateStatus(applyId, status);

        return new Response(JSON.stringify({ message: 'Status updated successfully' }), { status: 200 });
    } catch (error) {
        if (error instanceof Error) {
            console.error('PUT /api/member/apply Error:', error);
            return new Response(JSON.stringify({ error: error.message }), { status: 500 });
        }
        return new Response(JSON.stringify({ error: 'Unknown server error' }), { status: 500 });
    }
}
