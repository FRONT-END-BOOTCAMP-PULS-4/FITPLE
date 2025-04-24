'use client';
import React from 'react';
import Image from 'next/image';
import styles from './page.module.scss';
import LoginButton from '@/components/Button/LoginButton';

const Login: React.FC = () => {
    const handleKakaoLogin = () => {
        window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}&scope=profile_nickname,profile_image`;
    };

    const handleGoogleLogin = () => {
        window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI}&scope=openid%20email%20profile`;
    };
    return (
        <div className={styles.container}>
            <div className={styles.title}>개발자 매칭 플랫폼</div>
            <Image src="/images/logo-blue.svg" alt="logo" width={280} height={168} className={styles.logo} priority />
            <LoginButton variant="kakao" onClick={handleKakaoLogin}>
                카카오로 계속하기
            </LoginButton>
            <LoginButton variant="google" onClick={handleGoogleLogin}>
                구글로 계속하기
            </LoginButton>
        </div>
    );
};

export default Login;
