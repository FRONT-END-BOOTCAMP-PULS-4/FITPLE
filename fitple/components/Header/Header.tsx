'use client';

import { useEffect, useState } from 'react';
import styles from './Header.module.scss';
import Image from 'next/image';
import { useAuthStore } from '@/stores/authStore';
import Link from 'next/link';

const Header = () => {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const nickname = useAuthStore((state) => state.nickname);

    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
      }, []);

    const clickHandler = () => {
        const { clearAuth } = useAuthStore.getState();
        clearAuth();
        window.location.href = '/';
    };

    return (
        <div className={styles.headerContainer}>
            <Link href="/">
                <Image src="/images/logo-blue.png" alt="logo" width={120} height={50} />
            </Link>
            <ul className={styles.ulStyles}>
                {isClient && isAuthenticated() ? (
                    <>
                        <li className={styles.welcomeText}>{nickname}님 환영합니다!</li>
                        <button onClick={clickHandler}>로그아웃</button>
                        <Link href="/mypage">
                            <div className={styles.userIcon} />
                        </Link>
                        <div className={styles.notificationIcon} />
                    </>
                ) : (
                    <Link href="/login" className={styles.loginText}>
                        로그인
                    </Link>
                )}
            </ul>
        </div>
    );
};

export default Header;
