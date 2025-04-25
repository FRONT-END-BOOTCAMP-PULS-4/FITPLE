import { ApplyCreateUsecase } from '@/back/apply/application/usecases/ApplyCreateUsecase';
import { ApplyCreateDto } from '@/back/apply/application/usecases/dto/ApplyCreateDto';
import { FindMyApplyListUsecase } from '@/back/apply/application/usecases/FindMyApplyListUsecase';
import { SbApplyRepository } from '@/back/apply/infra/repositories/supabase/SbApplyRepository';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function GET(req: Request) {
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

        const repository = new SbApplyRepository();
        const usecase = new FindMyApplyListUsecase(repository);
        const result = await usecase.execute(decoded.id);

        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        console.error('[GET /api/member/apply] error:', error);
        return NextResponse.json({ error: 'Failed to fetch apply list' }, { status: 500 });
    }
}

// POST /api/member/apply
export async function POST(req: NextRequest) {
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

        const body = await req.json();

        const { projectId, message, status } = body;
        if (!projectId || !message) {
            return new Response(JSON.stringify({ error: 'Missing required fields' }), {
                status: 400,
            });
        }

        const userId = decoded.id;

        const dto = new ApplyCreateDto(userId, projectId, message, status);
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
