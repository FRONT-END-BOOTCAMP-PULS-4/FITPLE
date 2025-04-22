// FILE: app/api/login/route.ts
import { NextRequest, NextResponse } from 'next/server';

const KAKAO_TOKEN_URL = 'https://kauth.kakao.com/oauth/token';
const KAKAO_USER_INFO_URL = 'https://kapi.kakao.com/v2/user/me';

export async function POST(req: NextRequest) {
    try {
        const { code } = await req.json();

        if (!code) {
            return NextResponse.json({ error: 'Authorization code is missing' }, { status: 400 });
        }

        // 1. 카카오에서 access token 받아오기
        const tokenResponse = await fetch(KAKAO_TOKEN_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                grant_type: 'authorization_code',
                client_id: process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY || '',
                redirect_uri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI || '',
                code,
            }),
        });
        if (!tokenResponse.ok) {
            const errText = await tokenResponse.text();
            return NextResponse.json({ error: 'Failed to fetch token', details: errText }, { status: 500 });
        }

        const tokenData = await tokenResponse.json();
        const { access_token } = tokenData;

        // 2. access token으로 사용자 정보 요청
        const userResponse = await fetch(KAKAO_USER_INFO_URL, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });
        if (!userResponse.ok) {
            const errText = await userResponse.text();
            return NextResponse.json({ error: 'Failed to fetch user info', details: errText }, { status: 500 });
        }

        const userInfo = await userResponse.json();
        console.log('사용자 정보:', userInfo);
        // 사용자 정보가 supabase에 없을 때 회원가입 처리

        // 사용자 정보가 supabase에 있을 때 로그인 처리

        // 3. 필요한 정보만 가공해서 응답
        return NextResponse.json({
            message: 'Kakao login successful',
            user: {
                id: userInfo.id,
                nickname: userInfo.kakao_account?.profile?.nickname,
                avatar_url: userInfo.kakao_account?.profile?.thumbnail_image,
                email: userInfo.kakao_account?.email,
            },
            access_token,
        });
    } catch (error) {
        console.error('Kakao OAuth 오류 발생:', error);
        return NextResponse.json({ error: 'Unexpected error occurred' }, { status: 500 });
    }
}
