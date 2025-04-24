// FILE: app/api/login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { LogInUsecase } from '@/back/user/application/usecases/LogInUsecase';
import { SocialLogInDto } from '@/back/user/application/usecases/dto/SocialLogInDto';
import { KKSocialRepository } from '@/back/user/infra/repositories/kakao/KKSocialRepository';
import { SbUserRepository } from '@/back/user/infra/repositories/supabase/SbUserRepository';
import { SbUserSkillRepository } from '@/back/user/infra/repositories/supabase/SbUserSkillRepository';
import { SbUserPositionRepository } from '@/back/user/infra/repositories/supabase/SbUserPositionRepository';

export async function POST(req: NextRequest) {
    try {
        const { code } = await req.json();
        if (!code) {
            return NextResponse.json({ error: 'Authorization code is missing' }, { status: 400 });
        }
        // 1. LogInUsecase 인스턴스 생성
        const logInUsecase = new LogInUsecase(
            new SbUserRepository(),
            new SbUserSkillRepository(),
            new SbUserPositionRepository(),
            new KKSocialRepository()
        );
        // 2. SocialLogInDto 생성
        const logInDto: SocialLogInDto = {
            provider: 'kakao',
            authCode: code,
        };
        // 3. LogInUsecase 실행
        const token = await logInUsecase.execute(logInDto);
        // 4. 토큰 변환
        return NextResponse.json({
            message: 'Kakao login successful',
            token: token,
        });
    } catch (error) {
        console.error('Kakao OAuth 오류 발생:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json({ error: 'Unexpected error occurred', details: errorMessage }, { status: 500 });
    }
}
