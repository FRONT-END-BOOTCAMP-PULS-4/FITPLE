import { SbApplyRepository } from '@/back/apply/infra/repositories/supabase/SbApplyRepository';
import { NextRequest } from 'next/server';

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
