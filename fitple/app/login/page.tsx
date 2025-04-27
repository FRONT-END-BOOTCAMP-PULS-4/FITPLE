'use client';
import React from 'react';
import Image from 'next/image';
import styles from './page.module.scss';
import LoginButton from '@/components/Button/LoginButton';
import { useGoogleLogin } from '@react-oauth/google';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';

const Login: React.FC = () => {
    const {
        setId,
        setToken,
        setNickname,
        setPosition,
        setSkills,
        setCareer,
        setAvatarUrl,
        setEmail,
        setSignUpPayload,
    } = useAuthStore();
    const router = useRouter();
    const handleKakaoLogin = () => {
        window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}&scope=profile_nickname,profile_image`;
    };

    const login = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                // 1. 사용자 정보 요청
                const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                    headers: {
                        Authorization: `Bearer ${tokenResponse.access_token}`,
                    },
                });
                const userInfo = await res.json();
                // console.log('Google 사용자 정보:', userInfo);
                // console.log('Google 사용자 정보:', userInfo.sub);
                // 2. 서버에 로그인 요청
                const backendRes = await fetch('/api/login/google', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ clientId: userInfo.sub }), // ✅ 객체로 보내기
                });

                if (!backendRes.ok) {
                    throw new Error('서버 응답 실패');
                }

                const data = await backendRes.json();
                // console.log('백엔드 응답:', data);

                const token = data.token.token;
                const payload = data.token.payload;
                if (token === 'not user') {
                    // 회원 정보가 없는 경우
                    // console.log('회원 정보가 없습니다.');
                    setSignUpPayload({
                        id: null,
                        name: userInfo.name,
                        nickname: null,
                        email: userInfo.email,
                        career: null,
                        skills: [],
                        position: null,
                        avatarUrl: userInfo.picture,
                        socialClientId: userInfo.sub,
                    });
                    router.push('/login/nicknamecheck'); // 기술 스택 선택 페이지로 이동
                    return;
                }

                // 로그인 성공 → 홈페이지로 이동
                // console.log('로그인 성공:', payload);
                setId(payload.id);
                setToken(token);
                setNickname(payload.nickname);
                setPosition(payload.position);
                setSkills(payload.skills);
                setCareer(payload.career);
                setAvatarUrl(payload.avatarUrl);
                setEmail(payload.email);
                // console.log('로그인 성공', token);
                router.push('/'); // 홈페이지로 이동
            } catch (error) {
                console.error('Google 로그인 처리 중 오류 발생:', error);
                alert('Google 로그인 처리 중 오류가 발생했습니다. 다시 시도해주세요.');
            }
        },
        onError: (err) => {
            console.error('Google 로그인 실패:', err);
            alert('Google 로그인에 실패했습니다.');
        },
    });

    return (
        <div className={styles.container}>
            <div className={styles.title}>개발자 매칭 플랫폼</div>
            <Image src="/images/logo-blue.svg" alt="logo" width={280} height={168} className={styles.logo} priority />
            <LoginButton variant="kakao" onClick={handleKakaoLogin}>
                카카오로 계속하기
            </LoginButton>
            <LoginButton variant="google" onClick={() => login()}>
                구글로 계속하기
            </LoginButton>
        </div>
    );
};

export default Login;
