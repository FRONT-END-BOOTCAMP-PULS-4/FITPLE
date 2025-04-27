"use client";

import styles from './page.module.scss';
import { useAuthStore } from '@/stores/authStore';
import SkillBadge from '@/components/Badge/SkillBadge';

export default function RootMyPage() {
    const nickname = useAuthStore((state) => state.nickname);
    const career = useAuthStore((state) => state.career);
    const position = useAuthStore((state) => state.position);
    const skills = useAuthStore((state) => state.skills);
    const avatarUrl = useAuthStore((state) => state.avatarUrl);

    return (
        <div className={styles.myInfoContainer}>
            <div
                className={styles.imageBox}
                style={{
                    backgroundImage: `url(${avatarUrl || '/images/test-team.png'})`
                }}
            ></div>

            <div className={styles.userInfo}>
                <span className={styles.userNickname}>{nickname ?? '닉네임 없음'}</span>
                <div className={styles.userPosicareerContainer}>
                    <span className={styles.userPosicareer}>{position || '포지션 없음'}</span>
                    <span className={styles.userPosicareer}>
                        {career !== null ? (career === 0 ? '신입' : `${career}년차`) : '경력 없음'}
                    </span>
                </div>
            </div>

            <div className={styles.stackContainer}>
                <span className={styles.stackHeader}>나의 기술스택은?</span>
                <div className={styles.stackBox}>
                    {skills.length > 0 ? (
                        skills.map((skill, idx) => (
                            <SkillBadge type='icon' iconLogoSize={60} key={idx} name={skill} label={skill} />
                        ))
                    ) : (
                        <span className={styles.noSkillText}>기술스택 정보가 없습니다.</span>
                    )}
                </div>
            </div>
        </div>
    );
}
