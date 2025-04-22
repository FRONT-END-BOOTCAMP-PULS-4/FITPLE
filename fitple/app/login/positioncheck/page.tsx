'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './page.module.scss';
import StepProgressBar from '@/components/StepProgressBar/page';
import Button from '@/components/Button/Button';
import Select from '@/components/Select/Select';
import Option from '@/components/Select/Option';
import { useAuthStore } from '@/stores/authStore';
import { useValidation } from '@/hooks/useValidation';

export const positionOptions = [
    { value: '프론트엔드', label: '프론트엔드' },
    { value: '백엔드', label: '백엔드' },
    { value: 'UI/UX 디자이너', label: 'UI/UX 디자이너' },
    { value: 'PM', label: 'PM' },
    { value: '기획자', label: '기획자' },
];

const PositionCheck: React.FC = () => {
    const { setPosition, position } = useAuthStore();
    const router = useRouter();
    const { isValid, errorMessage, validate } = useValidation();

    const handlePrevClick = () => {
        router.push('/login/careercheck');
    };
    const handleNextClick = () => {
        console.log('career', position);
        if (validate(undefined, position)) {
            router.push('/login/skillcheck');
        } else {
            console.log('Validation failed:', errorMessage);
        }
    };
    return (
        <div className={styles.container}>
            <Image src="/images/logo-blue.svg" alt="logo" width={150} height={90} className={styles.logo} />
            <div className={styles.progressWrapper}>
                <StepProgressBar step={3} />
            </div>
            <div className={styles.selectContainer}>
                <Select onChange={setPosition} options={positionOptions} placeholder="직무를 선택해주세요">
                    {positionOptions.map((position) => (
                        <Option key={position.value} value={position.value}>
                            {position.value}
                        </Option>
                    ))}
                </Select>
                {!isValid && <p className={styles.error}>{errorMessage}</p>}
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
