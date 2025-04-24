'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuthStore } from '@/stores/authStore';

export default function KakaoCallbackPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const code = searchParams.get('code');
    const { setId, setToken, setNickname } = useAuthStore();

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
                    console.log('백엔드 응답:', data);

                    // 2. jsonwebtoken으로 JWT 검증
                    if (!process.env.NEXT_PUBLIC_SECRET_KEY) {
                        throw new Error('NEXT_PUBLIC_SECRET_KEY is not defined');
                    }

                    const token = data.token.token;
                    const payload = data.token.payload;

                    // 로그인 성공 → 홈페이지로 이동
                    console.log('로그인 성공:', payload);
                    setId(payload.id);
                    setToken(token);
                    setNickname(payload.nickname);
                    router.push('/'); // 홈페이지로 이동
                })
                .catch((err) => {
                    console.error('에러 발생:', err);

                    // 에러 메시지가 "회원 정보가 없습니다."인 경우 닉네임 체크 페이지로 이동
                    if (err.message === '회원 정보가 없습니다.') {
                        router.push('/login/nicknamecheck');
                    } else {
                        // 그 외 에러 시 → 로그인 페이지로 이동
                        router.replace('/login');
                    }
                });
        }
    }, [code, router]);

    return <p>카카오 로그인 중...</p>;
}
