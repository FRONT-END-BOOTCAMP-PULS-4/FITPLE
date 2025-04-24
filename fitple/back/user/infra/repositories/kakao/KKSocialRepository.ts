import { SocialRepository } from '@/back/user/domain/repositories/SocialRepository';

export class KKSocialRepository implements SocialRepository {
    async getAccessToken(code: string): Promise<string> {
        const KAKAO_TOKEN_URL = 'https://kauth.kakao.com/oauth/token';

        if (!code) {
            return JSON.stringify({ error: 'Authorization code is missing' });
        }

        // 1. 카카오에서 access token 받아오기
        const tokenResponse = await fetch(KAKAO_TOKEN_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                grant_type: 'authorization_code',
                client_id: process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID || '',
                redirect_uri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI || '',
                code,
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
        const KAKAO_USER_INFO_URL = 'https://kapi.kakao.com/v2/user/me';

        // 2. access token으로 사용자 정보 요청
        const userResponse = await fetch(KAKAO_USER_INFO_URL, {
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
