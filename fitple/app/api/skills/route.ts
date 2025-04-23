import { GetSkillListUsecase } from '@/back/skill/application/usecases/GetSkillListUsecase';
import { SbSkillRepository } from '@/back/skill/infra/repositories/supabase/SbSkillRepository';
import { NextResponse } from 'next/server';

export async function GET() {
    const usecase = new GetSkillListUsecase(new SbSkillRepository());
    const skills = await usecase.execute();
    return NextResponse.json(skills);
}
