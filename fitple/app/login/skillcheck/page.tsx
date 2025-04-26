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
    const { skills, setSkills, setId, setAvatarUrl, setCareer, setEmail, setNickname, setPosition, setToken } =
        useAuthStore(); // useAuthStore에서 skills와 setSkills 가져오기
    const [error, setError] = useState(false);
    const [bottomText, setBottomText] = useState('기술 스택을 선택해주세요.');
    const handlePrevClick = () => {
        router.push('/login/positioncheck');
    };

    const handleNextClick = async () => {
        if (skills.length === 0) {
            setBottomText('기술 스택을 선택해주세요.');
            setError(true);
            alert('기술 스택을 선택해주세요.');
            return;
        }
        try {
            // AuthStore의 payload 가져오기
            const { nickname, career, skills, position, signUpPayload } = useAuthStore.getState();

            const payload = {
                name: signUpPayload.name,
                nickname: nickname,
                email: signUpPayload.email,
                career: career,
                skills: skills,
                position: position,
                avatarUrl: signUpPayload.avatarUrl,
                socialClientId: signUpPayload.socialClientId,
            };

            // API 요청
            const response = await fetch('/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error('회원가입 요청 실패');
            }

            const data = await response.json();
            // console.log('회원가입 성공:', data);
            setId(data.user.id);
            setToken(data.token);
            setNickname(data.user.nickname);
            setPosition(data.user.position);
            setSkills(data.user.skills);
            setCareer(data.user.career);
            setAvatarUrl(data.user.avatarUrl);
            setEmail(data.user.email);

            // 성공 시 홈페이지로 이동
            router.push('/');
        } catch (error) {
            console.error('회원가입 요청 중 오류 발생:', error);
            alert('회원가입 요청 중 오류가 발생했습니다. 다시 시도해주세요.');
        }
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
                            className={`${styles.badge} ${skills.includes(badge.props.label) ? styles.selected : ''}`}
                            onClick={() => toggleSkill(badge.props.label)}
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
