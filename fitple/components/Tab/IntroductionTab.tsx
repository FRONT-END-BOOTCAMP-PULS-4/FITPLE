import { useRouter } from 'next/navigation';
import Badge from '../Badge/Badge';
import SkillBadge from '../Badge/SkillBadge';
import Card from '../Card/Card';
import styles from './IntroductionTab.module.scss';
import { useCallback, useEffect, useState } from 'react';
import { IntroductionListDto } from '@/back/introduction/application/usecases/dto/IntroductionListDto';

type Props = {
    selectedSkills: string[];
    selectedPositions: string[];
};

export function IntroductionTab({ selectedSkills, selectedPositions }: Props) {
    const [introductions, setIntroductions] = useState<IntroductionListDto[]>([]);
    const router = useRouter();

    const fetchIntroductions = useCallback(async () => {
        try {
            const res = await fetch('/api/introductions');
            if (!res.ok) throw new Error(`서버 오류: ${res.status}`);
            const data = await res.json();
            setIntroductions(data);
        } catch (error) {
            console.error('프로젝트 데이터를 불러오는 중 오류 발생:', error);
        }
    }, []);

    useEffect(() => {
        fetchIntroductions();
    }, [fetchIntroductions]);

    const filteredPosts = introductions.filter((introduction) => {
        const skillMatch =
            selectedSkills.length === 0 ||
            selectedSkills.some((skill) => introduction.skills.map((s: { name: string }) => s.name).includes(skill));

        const positionMatch =
            selectedPositions.length === 0 ||
            selectedPositions.some((position) =>
                introduction.positions.map((p: { name: string }) => p.name).includes(position)
            );

        return skillMatch && positionMatch;
    });
    return (
        <div className={styles.introduction}>
            {filteredPosts.map((introduction) => (
                <div
                    key={introduction.id}
                    onClick={() => router.push(`/board/introduction/${introduction.id}`)}
                    style={{ cursor: 'pointer' }}
                >
                    <Card
                        header={
                            <div>
                                <span>
                                    <Badge size="md" variant="filled" backgroundColor="var(--lion-color)">
                                        🦁 프로필
                                    </Badge>
                                </span>
                            </div>
                        }
                        body={
                            <div className={styles.cardBody}>
                                <div className={styles.leftBody}>
                                    <div className={styles.userInfo}>
                                        <h3>{introduction.user.nickname}</h3>
                                        {introduction.positions.map((position) => (
                                            <p key={position.id}>{position.name}</p>
                                        ))}
                                    </div>
                                    <div className={styles.title}>{introduction.title}</div>

                                    <div className={styles.skillList}>
                                        {introduction.skills.map((skill) => (
                                            <SkillBadge key={skill.id} type="icon" name={skill.name} />
                                        ))}
                                    </div>
                                </div>
                                <div className={styles.rightBody}>
                                    <img src={introduction.user.avatarUrl} alt="이미지없음" />
                                </div>
                            </div>
                        }
                        footer={
                            <div className={styles.cardFooter}>
                                <div>❤️ {introduction.likeCount}</div>
                                <div>{introduction.daysAgo}일전</div>
                            </div>
                        }
                    />
                </div>
            ))}
        </div>
    );
}
