import { GetPositionListUsecase } from '@/back/position/application/usecases/GetPositionListUsecase';
import { SbPositionRepository } from '@/back/position/infra/repositories/supabase/SbPositionRepository';
import { NextResponse } from 'next/server';

export async function GET() {
    const usecase = new GetPositionListUsecase(new SbPositionRepository());
    const positions = await usecase.execute();
    return NextResponse.json(positions);
}
