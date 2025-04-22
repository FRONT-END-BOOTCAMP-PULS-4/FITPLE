'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuthStore } from '@/stores/authStore';

export default function GoogleCallBack() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const code = searchParams.get('code');
    const { setId, setNickname, setToken } = useAuthStore();

    useEffect(() => {
        if (code) {
            fetch('/api/login/google', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code }),
            })
                .then(async (res) => {
                    if (!res.ok) {
                        throw new Error('서버 응답 실패');
                    }
                    const data = await res.json();
                    console.log('백엔드 응답:', data);

                    // 로그인 성공 → 페이지 이동
                    // 이미 회원가입된 경우 홈으로

                    // 회원가입이 필요한 경우 닉네임 체크 페이지로 이동
                    setId(data.user.id); // 사용자 ID 설정
                    setNickname(data.user.nickname); // 첫 회원일때만
                    setToken(data.access_token); // 사용자 토큰 설정
                    router.push('/login/nicknamecheck'); // 원하는 경로로 변경
                })
                .catch((err) => {
                    console.error('에러 발생:', err);

                    // 에러 시 → 로그인 페이지로 이동
                    router.replace('/login');
                });
        }
    }, [code]);

    return <p>구글 로그인 중...</p>;
}
