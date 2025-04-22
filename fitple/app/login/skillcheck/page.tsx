'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './page.module.scss';
import StepProgressBar from '@/components/StepProgressBar/page';
import Button from '@/components/Button/Button';
import { SkillBadges } from './SkillBadges';

const SkillCheck: React.FC = () => {
    const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
    const router = useRouter();

    const handlePrevClick = () => {
        router.push('/login/positioncheck');
    };

    const handleNextClick = () => {
        console.log('Selected Skills:', selectedSkills);
        router.push('/');
    };

    const toggleSkill = (skill: string) => {
        setSelectedSkills((prev) => (prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]));
    };

    return (
        <div className={styles.container}>
            <Image src="/images/logo-blue.svg" alt="logo" width={150} height={90} className={styles.logo} />
            <div className={styles.progressWrapper}>
                <StepProgressBar step={4} />
            </div>
            <div className={styles.selectContainer}>
                {SkillBadges.map((badge) => (
                    <div
                        key={badge.key}
                        className={`${styles.badge} ${
                            selectedSkills.includes(badge.props.name) ? styles.selected : ''
                        }`}
                        onClick={() => toggleSkill(badge.props.name)}
                    >
                        {badge}
                    </div>
                ))}
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

export default SkillCheck;
