'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './page.module.scss';
import StepProgressBar from '@/components/StepProgressBar/page';
import Button from '@/components/Button/Button';
import Label from '@/components/Input/Label';
import Input from '@/components/Input/Input';
import { useAuthStore } from '@/stores/authStore';

const NicknameCheck: React.FC = () => {
    const router = useRouter();
    const { nickname, setNickname } = useAuthStore();
    const [error, setError] = useState(false);
    const [bottomText, setBottomText] = useState('닉네임을 입력해주세요.');
    const [isCompleted, setIsCompleted] = useState(false); // 완료 상태 추가

    const handlePrevClick = () => {
        router.push('/login');
    };

    const handleNextClick = () => {
        if (isCompleted) {
            router.push('/login/careercheck');
        } else {
            alert('닉네임 중복 확인을 완료해주세요.');
            setBottomText('중복 확인을 완료해주세요.');
            setError(true);
        }
    };

    const nicknameCheckHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (!nickname) {
            setBottomText('닉네임을 입력해주세요.');
            setIsCompleted(false); // 완료 상태 해제
            setError(true);
            return;
        }

        try {
            const response = await fetch('/api/namecheck', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nickname }),
            });

            if (!response.ok) {
                throw new Error('서버 오류가 발생했습니다.');
            }

            const data = await response.json();

            if (data.exists) {
                setBottomText('이미 존재하는 닉네임입니다.');
                setError(true);
                setIsCompleted(false); // 완료 상태 해제
            } else {
                alert('사용 가능한 닉네임입니다.');
                setError(false);
                setIsCompleted(true); // 완료 상태 설정
            }
        } catch (error) {
            console.error('닉네임 확인 중 오류 발생:', error);
            setBottomText('서버 오류가 발생했습니다. 다시 시도해주세요.');
            setError(true);
            setIsCompleted(false); // 완료 상태 해제
        }
    };

    return (
        <div className={styles.container}>
            <Image src="/images/logo-blue.svg" alt="logo" width={150} height={90} className={styles.logo} />
            <div className={styles.progressWrapper}>
                <StepProgressBar step={1} />
            </div>
            <div
                className={`${styles.labelWrapper} ${
                    isCompleted ? styles.completed : '' /* 완료 상태에 따라 클래스 추가 */
                }`}
            >
                <Label label="닉네임을 입력해주세요" bottomText={bottomText} hasError={error}>
                    <Input
                        placeholder="닉네임을 입력해주세요"
                        onChange={(e) => setNickname(e.target.value)}
                        value={nickname || ''}
                        renderRight={
                            <Button size="sm" onClick={nicknameCheckHandler}>
                                중복 확인
                            </Button>
                        }
                    />
                </Label>
            </div>
            <div className={styles.btnContainer}>
                <Button variant="cancel" size="md" onClick={handlePrevClick}>
                    이전
                </Button>
                <Button variant="confirm" size="md" onClick={handleNextClick}>
                    다음
                </Button>
            </div>
        </div>
    );
};

export default NicknameCheck;
