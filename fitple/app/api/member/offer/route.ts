import { OfferCreateDto } from '@/back/offer/application/usecases/dto/OfferCreateDto';
import { FindSentOfferListUsecase } from '@/back/offer/application/usecases/FindSentOfferListUsecase';
import { OfferCreateUsecase } from '@/back/offer/application/usecases/OfferCreateUsecase';
import { SbOfferRepository } from '@/back/offer/infra/repositories/supabase/SbOfferRepository';
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
        const offerRepository = new SbOfferRepository();

        const findSentOfferListUsecase = new FindSentOfferListUsecase(offerRepository);

        const applyApplicantView = await findSentOfferListUsecase.execute(decoded.id);

        return NextResponse.json(applyApplicantView, { status: 200 });
    } catch (error) {
        console.error('Error fetching project detail:', error);
        return NextResponse.json({ error: 'Failed to fetch project detail' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const authHeader = request.headers.get('Authorization');
        if (!authHeader || !authHeader.startsWith('Bearer')) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        const token = authHeader.split(' ')[1];

        const decoded = jwt.verify(token, process.env.SECRET_KEY!) as jwt.JwtPayload;

        if (!decoded.id) {
            return NextResponse.json({ error: 'Unauthorized: user ID missing' }, { status: 401 });
        }

        const userId = decoded.id;

        const body = await request.json();

        const { projectId, introductionId, message, status } = body;

        if (!projectId || !message || !introductionId) {
            return new Response(JSON.stringify({ error: 'Missing required fields' }), {
                status: 400,
            });
        }

        const dto = new OfferCreateDto(userId, introductionId, projectId, message, status);
        const repository = new SbOfferRepository();
        const usecase = new OfferCreateUsecase(repository);
        const result = await usecase.execute(dto);

        return new Response(JSON.stringify(result), { status: 201 });
    } catch (error) {
        if (error instanceof Error) {
            console.error('POST /api/member/offer Error:', error);
            return new Response(JSON.stringify({ error: error.message }), { status: 500 });
        }
        return new Response(JSON.stringify({ error: 'Unknown server error' }), { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        const { offerId, status } = await request.json();

        // 상태가 유효한지 확인
        if (!['waiting', 'accept', 'reject'].includes(status)) {
            return new Response(JSON.stringify({ error: 'Invalid status' }), { status: 400 });
        }

        const repository = new SbOfferRepository();
        await repository.updateStatus(offerId, status);

        return new Response(JSON.stringify({ message: 'Status updated successfully' }), { status: 200 });
    } catch (error) {
        if (error instanceof Error) {
            console.error('PUT /api/member/offer Error:', error);
            return new Response(JSON.stringify({ error: error.message }), { status: 500 });
        }
        return new Response(JSON.stringify({ error: 'Unknown server error' }), { status: 500 });
    }
}
