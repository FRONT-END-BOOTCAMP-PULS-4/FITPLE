"use client";

import styles from './Header.module.scss';
import Image from 'next/image';
import { useAuthStore } from '@/stores/authStore';
import Link from 'next/link';

const Header = () => {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const nickname = useAuthStore((state) => state.nickname);

    console.log(nickname)

    return (
        <div className={styles.headerContainer}>
            <Image
                src="/images/logo-blue.png"
                alt="logo"
                width={120}
                height={50}
            />
            <ul className={styles.ulStyles}>
                {isAuthenticated() ? (
                    <>
                        <li className={styles.welcomeText}>
                            {nickname}님 환영합니다!
                        </li>
                        <Link href="/mypage">
                            <li><div className={styles.userIcon} /></li>
                        </Link>
                        <li><div className={styles.notificationIcon} /></li>
                    </>
                ) : (
                    <Link href="/login">
                        <li className={styles.loginText}>로그인</li>
                    </Link>
                )}
            </ul>
        </div>
    );
};

export default Header;