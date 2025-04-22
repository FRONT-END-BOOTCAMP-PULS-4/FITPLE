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

export const careerOptions = Array.from({ length: 6 }, (_, i) => ({
    value: i + 1,
    label: i + 1,
}));

const CareerCheck: React.FC = () => {
    const { setCareer, career } = useAuthStore();
    const router = useRouter();
    const { isValid, errorMessage, validate } = useValidation();

    const handlePrevClick = () => {
        router.push('/login/nicknamecheck');
    };
    const handleNextClick = () => {
        console.log('career', career);
        if (validate(career, undefined)) {
            router.push('/login/positioncheck');
        } else {
            console.log('Validation failed:', errorMessage);
        }
    };
    return (
        <div className={styles.container}>
            <Image src="/images/logo-blue.svg" alt="logo" width={150} height={90} className={styles.logo} />
            <div className={styles.progressWrapper}>
                <StepProgressBar step={2} />
            </div>
            <div className={styles.selectContainer}>
                <Select onChange={setCareer} options={careerOptions} placeholder="경력을 선택해주세요" value={career}>
                    {careerOptions.map((career) => (
                        <Option key={career.value} value={career.value}>
                            {career.label}
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

export default CareerCheck;
