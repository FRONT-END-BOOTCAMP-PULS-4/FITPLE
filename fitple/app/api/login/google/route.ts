import { NextRequest, NextResponse } from 'next/server';
import { LogInUsecase } from '@/back/user/application/usecases/LogInUsecase';
import { SocialLogInDto } from '@/back/user/application/usecases/dto/SocialLogInDto';
import { GGSocialRepository } from '@/back/user/infra/repositories/google/GGSocialRepository';
import { SbUserRepository } from '@/back/user/infra/repositories/supabase/SbUserRepository';
import { SbUserSkillRepository } from '@/back/user/infra/repositories/supabase/SbUserSkillRepository';
import { SbUserPositionRepository } from '@/back/user/infra/repositories/supabase/SbUserPositionRepository';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        console.log(body);
        const { clientId } = body; // 클라이언트 ID를 요청 본문에서 가져옴
        console.log('Google OAuth client id:', clientId);

        // 1. LogInUsecase 인스턴스 생성
        const logInUsecase = new LogInUsecase(
            new SbUserRepository(),
            new SbUserSkillRepository(),
            new SbUserPositionRepository(),
            new GGSocialRepository()
        );
        // 2. SocialLogInDto 생성
        const logInDto: SocialLogInDto = {
            provider: 'google',
            clientId: clientId,
        };
        // 3. LogInUsecase 실행
        const token = await logInUsecase.execute(logInDto);
        // 4. 토큰 변환
        return NextResponse.json({
            message: 'google login successful',
            token: token,
        });
    } catch (error) {
        console.error('Google OAuth 오류 발생:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json({ error: 'Unexpected error occurred', details: errorMessage }, { status: 500 });
    }
}
