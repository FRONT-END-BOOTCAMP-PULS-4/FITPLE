import { NextRequest, NextResponse } from 'next/server';
import { CreateTeamUsecase } from '@/back/team/application/usecases/CreateTeamUsecase';
import { CreateTeamDto } from '@/back/team/application/usecases/dto/createTeamDto';
import { SbTeamRepository } from '@/back/team/infra/repositories/supabase/SbTeamRepository';
import { SbUserRepository } from '@/back/user/infra/repositories/supabase/SbUserRepository';
export async function POST(req: NextRequest) {
    try {
        const { type, projectId, receiveUserId, applyUserId } = await req.json();

        if (!projectId || !receiveUserId || !applyUserId) {
            return NextResponse.json({ error: 'project_id와 user_id는 필수입니다.' }, { status: 400 });
        }
        const CreateTeamDto: CreateTeamDto = {
            type: type,
            projectId: projectId,
            receiveUserId: receiveUserId,
            applyUserId: applyUserId,
        };
        const createTeamUsecase = new CreateTeamUsecase(new SbTeamRepository(), new SbUserRepository());
        const teamData = await createTeamUsecase.execute(CreateTeamDto);

        if (teamData.message === '이미 팀에 속해있습니다.') {
            console.log('이미 팀이 존재합니다.');
            return NextResponse.json({ message: teamData.message, teamData }, { status: 200 });
        }
        if (teamData.message === '팀 추가 성공') {
            console.log('팀 추가 성공');
            return NextResponse.json({ message: teamData.message, teamData }, { status: 201 });
        }
    } catch (error) {
        console.error('팀 추가 중 오류 발생:', error);
        const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류';
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
