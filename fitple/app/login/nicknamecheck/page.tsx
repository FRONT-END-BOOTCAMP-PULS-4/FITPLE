'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './page.module.scss';
import StepProgressBar from '@/components/StepProgressBar/page';
import Label from '@/components/Input/Label';
import Input from '@/components/Input/Input';
import Button from '@/components/Button/Button';

const NicknameCheck: React.FC = () => {
    const router = useRouter();

    const handlePrevClick = () => {
        router.push('/login');
    };
    const handleNextClick = () => {
        router.push('/login/careercheck');
    };
    return (
        <div className={styles.container}>
            <Image src="/images/logo-blue.svg" alt="logo" width={150} height={90} className={styles.logo} />
            <div className={styles.progressWrapper}>
                <StepProgressBar step={1} />
            </div>
            <div className={styles.labelWrapper}>
                <Label label="닉네임을 입력해주세요" bottomText="동일한 닉네임이 존재합니다.">
                    <Input
                        placeholder="닉네임을 입력해주세요"
                        hasError={false}
                        renderRight={<Button size="sm">중복 확인</Button>}
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
