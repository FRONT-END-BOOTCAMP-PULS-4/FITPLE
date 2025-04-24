'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuthStore } from '@/stores/authStore';

export default function KakaoCallbackPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const code = searchParams.get('code');
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

    useEffect(() => {
        if (code) {
            fetch('/api/login/kakao', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code }),
            })
                .then(async (res) => {
                    if (!res.ok) {
                        throw new Error('서버 응답 실패');
                    }

                    const data = await res.json();
                    // console.log('백엔드 응답:', data);

                    // 2. jsonwebtoken으로 JWT 검증
                    if (!process.env.NEXT_PUBLIC_SECRET_KEY) {
                        throw new Error('NEXT_PUBLIC_SECRET_KEY is not defined');
                    }

                    const token = data.token.token;
                    const payload = data.token.payload;

                    if (token === 'not user') {
                        // 회원 정보가 없는 경우
                        console.log('회원 정보가 없습니다.');
                        setSignUpPayload({
                            id: null,
                            name: payload.name,
                            nickname: null,
                            email: '',
                            career: null,
                            skills: [],
                            position: null,
                            avatarUrl: payload.avatarUrl,
                            socialClientId: payload.socialClientId,
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

                    router.push('/'); // 홈페이지로 이동
                })
                .catch((err) => {
                    console.error('에러 발생:', err);
                });
        }
    }, [code, router]);

    return <p></p>;
}
