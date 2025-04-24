import { UserRepository } from '../../domain/repositories/UserRepository';
import { UserSkillRepository } from '../../domain/repositories/UserSkillRepository';
import { UserPositionRepository } from '../../domain/repositories/UserPositionRepository';

import { SignJWT } from 'jose';

import { SocialLogInDto } from './dto/SocialLogInDto';
import { SocialLoggedInDto } from './dto/SocialLoggedInDto';
import { UserSkillView } from '../../domain/entities/UserSkillView';
import { UserPositionView } from '../../domain/entities/UserPositionView';
import { SocialRepository } from '../../domain/repositories/SocialRepository';

// 이미 회원가입된 사용자 로그인 처리 하는 usecase
export class LogInUsecase {
    constructor(
        private userRepository: UserRepository,
        private userSkillRepository: UserSkillRepository,
        private userPositionRepository: UserPositionRepository,
        private SocialRepository: SocialRepository
    ) {}

    async execute(LogInDto: SocialLogInDto): Promise<SocialLoggedInDto> {
        try {
            const { provider, authCode } = LogInDto;
            console.log('카카오 로그인 처리');
            if (provider === 'kakao') {
                // 카카오 로그인 처리
                const kakaoToken = await this.SocialRepository.getAccessToken(authCode);
                const { access_token } = kakaoToken;
                const kakaoUserInfo = await this.SocialRepository.getSocialUserInfo(access_token);

                // 카카오 사용자 정보에서 필요한 정보 추출
                const { id } = kakaoUserInfo;
                console.log('kakaoUserInfo', kakaoUserInfo);

                // 소셜 클라이언트 ID를 사용하여 회원 정보 조회
                const socialClientId = id;
                console.log('socialClientId', socialClientId);

                const user = await this.userRepository.findById(socialClientId);
                console.log('user', user);
                // 회원이 없을 때 오류 반환
                if (!user) {
                    const payload = {
                        id: null,
                        socialClientId: socialClientId,
                        name: kakaoUserInfo.properties.nickname,
                        nickname: null,
                        career: null,
                        email: '',
                        skills: [],
                        position: null,
                        avatarUrl: kakaoUserInfo.properties.thumbnail_image,
                    };

                    return { token: 'not user', payload } as SocialLoggedInDto;
                }

                // 회원의 기술스택 반환
                if (!user.id) {
                    throw new Error('User ID is undefined.');
                }
                const skills: UserSkillView[] = await this.userSkillRepository.findAllByUserId(user.id);
                const skillNames = skills.map((userSkillView) => userSkillView.skill_id);
                // console.log('skillNames', skillNames);
                const position: UserPositionView = await this.userPositionRepository.findByUserId(user.id);
                const positionName = position.position_id;

                const payload = {
                    id: user.id,
                    nickname: user.nickname,
                    career: user.career,
                    email: user.email,
                    skills: skillNames,
                    position: positionName,
                    avatarUrl: user.avatarUrl,
                    socialClientId: socialClientId,
                };

                // 비밀 키는 환경 변수로 관리 (예: process.env.JWT_SECRET)
                // 토큰 유효기간은 1시간으로 설정 (필요에 따라 조정)
                // console.log('payload', payload);
                const secretKey = new TextEncoder().encode(process.env.NEXT_PUBLIC_SECRET_KEY);
                const token = await new SignJWT(payload).setProtectedHeader({ alg: 'HS256' }).sign(secretKey);

                // 회원 정보 토큰 전달
                return { token, payload } as SocialLoggedInDto;
            } else if (provider === 'google') {
                // 구글 로그인 처리
                const googleToken = await this.SocialRepository.getAccessToken(authCode);
                const { access_token } = googleToken;
                const googleUserInfo = await this.SocialRepository.getSocialUserInfo(access_token);

                // 구글 사용자 정보에서 필요한 정보 추출
                console.log('googleUserInfo', googleUserInfo);
                const { id } = googleUserInfo;

                // 소셜 클라이언트 ID를 사용하여 회원 정보 조회
                const socialClientId = id;
                // console.log('socialClientId', socialClientId);

                const user = await this.userRepository.findById(socialClientId);
                // console.log('user', user);
                // 회원이 없을 때 오류 반환
                if (!user) {
                    const payload = {
                        id: null,
                        socialClientId: socialClientId,
                        name: googleUserInfo.name,
                        nickname: null,
                        career: null,
                        email: googleUserInfo.email,
                        skills: [],
                        position: null,
                        avatarUrl: googleUserInfo.picture,
                    };

                    return { token: 'not user', payload } as SocialLoggedInDto;
                }

                // 회원의 기술스택 반환
                if (!user.id) {
                    throw new Error('User ID is undefined.');
                }
                const skills: UserSkillView[] = await this.userSkillRepository.findAllByUserId(user.id);
                const skillNames = skills.map((userSkillView) => userSkillView.skill_id);
                console.log('skillNames', skillNames);
                const position: UserPositionView = await this.userPositionRepository.findByUserId(user.id);
                const positionName = position.position_id;

                const payload = {
                    id: user.id,
                    nickname: user.nickname,
                    career: user.career,
                    email: user.email,
                    skills: skillNames,
                    position: positionName,
                    avatarUrl: user.avatarUrl,
                    socialClientId: socialClientId,
                };

                // 비밀 키는 환경 변수로 관리 (예: process.env.JWT_SECRET)
                // 토큰 유효기간은 1시간으로 설정 (필요에 따라 조정)
                console.log('payload', payload);
                const secretKey = new TextEncoder().encode(process.env.NEXT_PUBLIC_SECRET_KEY);
                const token = await new SignJWT(payload).setProtectedHeader({ alg: 'HS256' }).sign(secretKey);

                // 회원 정보 토큰 전달
                return { token, payload } as SocialLoggedInDto;
            } else {
                throw new Error('지원하지 않는 소셜 로그인입니다.');
            }
        } catch (error) {
            console.error('로그인 처리 중 오류 발생:', error);
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            throw new Error(`로그인 처리 중 오류 발생: ${errorMessage}`);
        }
    }
}
