import { TeamListUsecase } from '@/back/team/application/usecases/TeamListUsecase';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ message: 'userId가 필요합니다.' }, { status: 400 });
  }

  const usecase = new TeamListUsecase();
  const result = await usecase.execute(userId);

  return NextResponse.json(result);
}