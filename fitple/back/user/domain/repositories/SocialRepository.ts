// access token 가져오기
// access token으로 사용자 정보 가져오기
export interface SocialRepository {
    getAccessToken(authCode: string): Promise<string>;
    getSocialUserInfo(accessToken: string): Promise<string>;
}
