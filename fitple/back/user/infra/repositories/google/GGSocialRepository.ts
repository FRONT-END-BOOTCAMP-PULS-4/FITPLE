// access token 가져오기
// access token으로 사용자 정보 가져오기
import { SocialRepository } from '@/back/user/domain/repositories/SocialRepository';

export class GGSocialRepository implements SocialRepository {
    async getAccessToken(code: string): Promise<string> {
        const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token';

        if (!code) {
            return JSON.stringify({ error: 'Authorization code is missing' });
        }

        // 1. Google에서 access token 받아오기
        const tokenResponse = await fetch(GOOGLE_TOKEN_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                code,
                client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '',
                client_secret: process.env.GOOGLE_CLIENT_SECRET || '',
                redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI || '',
                grant_type: 'authorization_code',
            }),
        });
        if (!tokenResponse.ok) {
            const errText = await tokenResponse.text();
            return JSON.stringify({ error: 'Failed to fetch token', details: errText });
        }

        const tokenData = await tokenResponse.json();

        return tokenData;
    }
    async getSocialUserInfo(accessToken: string): Promise<string> {
        const GOOGLE_USER_INFO_URL = 'https://www.googleapis.com/oauth2/v2/userinfo';

        // 2. access token으로 사용자 정보 요청
        const userResponse = await fetch(GOOGLE_USER_INFO_URL, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        if (!userResponse.ok) {
            const errText = await userResponse.text();
            return JSON.stringify({ error: 'Failed to fetch user info', details: errText });
        }

        const userInfo = await userResponse.json();

        return userInfo;
    }
}
