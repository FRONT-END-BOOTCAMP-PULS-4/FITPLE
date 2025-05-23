'use client';

import { useEffect, useState } from 'react';
import styles from './Header.module.scss';
import Image from 'next/image';
import { useAuthStore } from '@/stores/authStore';
import Link from 'next/link';
import MyPageModal from '../Modal/MyPageModal/page';

const Header = () => {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const nickname = useAuthStore((state) => state.nickname);

    const [isClient, setIsClient] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 추가

    useEffect(() => {
        setIsClient(true);
    }, []);

    const clickHandler = () => {
        const { clearAuth } = useAuthStore.getState();
        clearAuth();
        setIsModalOpen((prev) => !prev); // 모달 열고 닫기
        window.location.href = '/';
    };
    const toggleModal = () => {
        setIsModalOpen((prev) => !prev); // 모달 열고 닫기
    };

    return (
        <div className={styles.headerContainer}>
            <div className={styles.innerWrapper}>
                <Link href="/">
                    <Image src="/images/logo-blue.svg" alt="logo" width={120} height={50} />
                </Link>
                <ul className={styles.ulStyles}>
                    {isClient && isAuthenticated() ? (
                        <>
                            <li className={styles.welcomeText}>{nickname}님 환영합니다!</li>
                            <Link href="/mypage"></Link>
                            <div className={styles.userIconWrapper}>
                                <div className={styles.userIcon} onClick={toggleModal} />
                                {isModalOpen && (
                                    <MyPageModal
                                        onClose={toggleModal}
                                        body={
                                            <ul className={styles.listWrapper}>
                                                <li>
                                                    <Link href="/mypage" onClick={toggleModal}>
                                                        내 정보
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/mypage/edit" onClick={toggleModal}>
                                                        내 정보 수정
                                                    </Link>
                                                </li>
                                                {/* <li>
                                                    <Link href="/mypage/likelist/projects" onClick={toggleModal}>
                                                        찜한 항목
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/mypage/mypost/projects" onClick={toggleModal}>
                                                        내 활동
                                                    </Link>
                                                </li> */}
                                                <li>
                                                    <Link href="/mypage/request/received" onClick={toggleModal}>
                                                        요청 목록
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/mypage/team" onClick={toggleModal}>
                                                        팀 프로젝트
                                                    </Link>
                                                </li>
                                                <li>
                                                    <div onClick={clickHandler} className={styles.logout}>
                                                        로그아웃
                                                    </div>
                                                </li>
                                            </ul>
                                        }
                                    />
                                )}
                            </div>
                            <div className={styles.notificationIcon} />
                        </>
                    ) : (
                        <Link href="/login" className={styles.loginText}>
                            로그인
                        </Link>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Header;
