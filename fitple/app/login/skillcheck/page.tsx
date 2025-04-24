'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './page.module.scss';
import StepProgressBar from '@/components/StepProgressBar/page';
import Button from '@/components/Button/Button';
import { SkillBadges } from './SkillBadges';
import { useAuthStore } from '@/stores/authStore';
import Label from '@/components/Input/Label';

const SkillCheck: React.FC = () => {
    const router = useRouter();
    const { skills, setSkills } = useAuthStore(); // useAuthStore에서 skills와 setSkills 가져오기
    const [error, setError] = useState(false);
    const [bottomText, setBottomText] = useState('기술 스택을 선택해주세요.');

    const handlePrevClick = () => {
        router.push('/login/positioncheck');
    };

    const handleNextClick = () => {
        if (skills.length === 0) {
            setBottomText('기술 스택을 선택해주세요.');
            setError(true);
            alert('기술 스택을 선택해주세요.');
            return;
        }

        router.push('/');
    };

    const toggleSkill = (skill: string) => {
        const newSkills = skills.includes(skill) ? skills.filter((s) => s !== skill) : [...skills, skill];
        setSkills(newSkills); // 선택된 기술 스택을 useAuthStore에 저장
        setError(false); // 에러 상태 해제
        setBottomText(''); // 하단 텍스트 초기화
    };

    return (
        <div className={styles.container}>
            <Image src="/images/logo-blue.svg" alt="logo" width={150} height={90} className={styles.logo} />
            <div className={styles.progressWrapper}>
                <StepProgressBar step={4} />
            </div>
            <Label label="기술 스택을 선택해주세요" bottomText={bottomText} hasError={error}>
                <div className={styles.selectContainer}>
                    {SkillBadges.map((badge) => (
                        <div
                            key={badge.key}
                            className={`${styles.badge} ${skills.includes(badge.props.name) ? styles.selected : ''}`}
                            onClick={() => toggleSkill(badge.props.name)}
                        >
                            {badge}
                        </div>
                    ))}
                </div>
            </Label>
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

export default SkillCheck;
