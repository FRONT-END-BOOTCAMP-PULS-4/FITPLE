'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './page.module.scss';
import StepProgressBar from '@/components/StepProgressBar/page';
import Button from '@/components/Button/Button';
import Label from '@/components/Input/Label';
import Select from '@/components/Select/Select';
import Option from '@/components/Select/Option';
import { useAuthStore } from '@/stores/authStore';

const CareerCheck: React.FC = () => {
    const router = useRouter();
    const { career, setCareer } = useAuthStore(); // useAuthStore에서 career와 setCareer 가져오기
    const [error, setError] = useState(false);
    const [bottomText, setBottomText] = useState('경력을 선택해주세요.');

    const careerOptions = Array.from({ length: 6 }, (_, i) => ({
        value: i + 1,
        label: i + 1,
    }));

    const handlePrevClick = () => {
        router.push('/login/nicknamecheck');
    };

    const handleNextClick = () => {
        if (!career) {
            setBottomText('경력을 선택해주세요.');
            setError(true);
            return;
        }

        router.push('/login/positioncheck');
    };

    const handleCareerChange = (value: number) => {
        setCareer(value); // 선택된 career를 useAuthStore에 저장
        setError(false); // 에러 상태 해제
        setBottomText(''); // 하단 텍스트 초기화
    };

    return (
        <div className={styles.container}>
            <Image src="/images/logo-blue.svg" alt="logo" width={150} height={90} className={styles.logo} />
            <div className={styles.progressWrapper}>
                <StepProgressBar step={2} />
            </div>
            <div className={styles.selectContainer}>
                <Label label="경력을 선택해주세요" bottomText={bottomText} hasError={error}>
                    <Select
                        onChange={(value) => handleCareerChange(Number(value))}
                        options={careerOptions}
                        placeholder="경력을 선택해주세요"
                        value={career || ''}
                    >
                        {careerOptions.map((career) => (
                            <Option key={career.value} value={career.value}>
                                {career.label}
                            </Option>
                        ))}
                    </Select>
                </Label>
            </div>
            <div className={styles.btnContainer}>
                <Button variant="cancel" size="md" onClick={handlePrevClick}>
                    이전
                </Button>
                <Button
                    variant="confirm"
                    size="md"
                    onClick={handleNextClick}
                    disabled={!career} // career가 없으면 버튼 비활성화
                >
                    다음
                </Button>
            </div>
        </div>
    );
};

export default CareerCheck;
