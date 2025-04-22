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

const PositionCheck: React.FC = () => {
    const router = useRouter();
    const { position, setPosition } = useAuthStore(); // useAuthStore에서 position과 setPosition 가져오기
    const [error, setError] = useState(false);
    const [bottomText, setBottomText] = useState('직무를 선택해주세요.');

    const positionOptions = [
        { value: '프론트엔드', label: '프론트엔드' },
        { value: '백엔드', label: '백엔드' },
        { value: 'UI/UX 디자이너', label: 'UI/UX 디자이너' },
        { value: 'PM', label: 'PM' },
        { value: '기획자', label: '기획자' },
    ];

    const handlePrevClick = () => {
        router.push('/login/careercheck');
    };

    const handleNextClick = () => {
        if (!position) {
            setBottomText('직무를 선택해주세요.');
            setError(true);
            return;
        }

        router.push('/login/skillcheck');
    };

    const handlePositionChange = (value: string) => {
        setPosition(value); // 선택된 position을 useAuthStore에 저장
        setError(false); // 에러 상태 해제
        setBottomText(''); // 하단 텍스트 초기화
    };

    return (
        <div className={styles.container}>
            <Image src="/images/logo-blue.svg" alt="logo" width={150} height={90} className={styles.logo} />
            <div className={styles.progressWrapper}>
                <StepProgressBar step={3} />
            </div>
            <div className={styles.selectContainer}>
                <Label label="직무를 선택해주세요" bottomText={bottomText} hasError={error}>
                    <Select
                        onChange={(value) => handlePositionChange(value)}
                        options={positionOptions}
                        placeholder="직무를 선택해주세요"
                        value={position || ''}
                    >
                        {positionOptions.map((position) => (
                            <Option key={position.value} value={position.value}>
                                {position.label}
                            </Option>
                        ))}
                    </Select>
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

export default PositionCheck;
