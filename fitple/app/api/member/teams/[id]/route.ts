import { TeamDetailUsecase } from '@/back/team/application/usecases/TeamDetailUsecase';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id: userId } = await params

  if (!userId) {
    return NextResponse.json({ message: 'userId가 필요합니다.' }, { status: 400 });
  }

  const usecase = new TeamDetailUsecase();
  const result = await usecase.execute(userId);

  return NextResponse.json(result);
}