import { NextRequest, NextResponse } from 'next/server';

const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token';
const GOOGLE_USER_INFO_URL = 'https://www.googleapis.com/oauth2/v2/userinfo';

export async function POST(req: NextRequest) {
    try {
        const { code } = await req.json();

        if (!code) {
            return NextResponse.json({ error: 'Authorization code is missing' }, { status: 400 });
        }

        // 1. Google에서 access token 받아오기
        const tokenResponse = await fetch(GOOGLE_TOKEN_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                code,
                client_id: process.env.GOOGLE_CLIENT_ID || '',
                client_secret: process.env.GOOGLE_CLIENT_SECRET || '',
                redirect_uri: process.env.GOOGLE_REDIRECT_URI || '',
                grant_type: 'authorization_code',
            }),
        });

        if (!tokenResponse.ok) {
            const errText = await tokenResponse.text();
            return NextResponse.json({ error: 'Failed to fetch token', details: errText }, { status: 500 });
        }

        const tokenData = await tokenResponse.json();
        const { access_token } = tokenData;

        // 2. access token으로 사용자 정보 요청
        const userResponse = await fetch(GOOGLE_USER_INFO_URL, {
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

        // 3. 필요한 정보만 가공해서 응답
        return NextResponse.json({
            message: 'Google login successful',
            user: {
                id: userInfo.id,
                name: userInfo.name,
                email: userInfo.email,
                picture: userInfo.picture,
            },
            access_token,
        });
    } catch (error) {
        console.error('Google OAuth 오류 발생:', error);
        return NextResponse.json({ error: 'Unexpected error occurred' }, { status: 500 });
    }
}
