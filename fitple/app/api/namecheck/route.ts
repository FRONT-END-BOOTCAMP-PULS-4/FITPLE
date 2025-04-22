import { SbUserRepository } from '@/back/user/infra/repositories/supabase/SbUserRepository';
import { NextRequest, NextResponse } from 'next/server';

// POST /api/namecheck
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { nickname } = body;

        if (!nickname) {
            return NextResponse.json({ error: '닉네임을 입력해주세요.' }, { status: 400 });
        }

        const repository = new SbUserRepository();
        const user = await repository.findByNickname(nickname);

        if (user) {
            return NextResponse.json({ exists: true }); // 닉네임이 이미 존재함
        } else {
            return NextResponse.json({ exists: false }); // 닉네임 사용 가능
        }
    } catch (error) {
        console.error('POST /api/namecheck Error:', error);
        return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
    }
}
