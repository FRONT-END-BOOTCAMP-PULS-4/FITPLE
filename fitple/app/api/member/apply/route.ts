
import { ApplyCreateUsecase } from "@/back/apply/application/usecases/ApplyCreateUsecase";
import { ApplyCreateDto } from "@/back/apply/application/usecases/dto/ApplyCreateDto";
import { FindMyApplyListUsecase } from "@/back/apply/application/usecases/FindMyApplyListUsecase";
import { SbApplyRepository } from "@/back/apply/infra/repositories/supabase/SbApplyRepository";
import { NextRequest, NextResponse } from "next/server";


export async function GET() {
  try {
    const userId = "e386c006-40bd-477d-8e33-9ad70fe2214a";

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized: user ID missing' }, { status: 401 });
    }

    const repository = new SbApplyRepository();
    const usecase = new FindMyApplyListUsecase(repository);
    const result = await usecase.execute(userId);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('[GET /api/member/apply] error:', error);
    return NextResponse.json({ error: 'Failed to fetch apply list' }, { status: 500 });
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
