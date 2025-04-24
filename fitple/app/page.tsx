'use client';

import PopularCarousel from '@/components/Carousel/PopularCarousel/PopularCarousel';
import { EmblaOptionsType } from 'embla-carousel';
import Card from '@/components/Card/Card';
import { Tab } from '@/components/Tab/Tab';
import FloatButton from '@/components/FloatButton/FloatButton';
import { useRouter } from 'next/navigation';
import Badge from '@/components/Badge/Badge';
import styles from './page.module.scss';
import SkillBadge from '@/components/Badge/SkillBadge';
import { useEffect, useState, useCallback } from 'react';
import { ProjectListDto } from '@/back/project/application/usecases/dto/ProjectListDto';
import { IntroductionListDto } from '@/back/introduction/application/usecases/dto/IntroductionListDto';

export default function Home() {
    const router = useRouter();
    const OPTIONS: EmblaOptionsType = {};
    const badgeColor = {
        project: 'var(--brand-color)',
        introduction: 'var(--lion-color)',
    } as const;

    const [projects, setProjects] = useState<ProjectListDto[]>([]);
    const [introductions, setIntroductions] = useState<IntroductionListDto[]>([]);

    const fetchData = useCallback(async () => {
        try {
            const [projectsRes, introductionsRes] = await Promise.all([
                fetch('/api/projects'),
                fetch('/api/introductions'),
            ]);

            if (!projectsRes.ok || !introductionsRes.ok) {
                throw new Error(`서버 오류`);
            }

            const projectsData = await projectsRes.json();
            const introductionsData = await introductionsRes.json();

            setProjects(projectsData);
            setIntroductions(introductionsData);
        } catch (error) {
            console.error('데이터를 불러오는 중 오류 발생:', error);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const allPosts = [...projects, ...introductions];
    const popularPosts = allPosts.sort((a, b) => b.likeCount - a.likeCount).slice(0, 5);

    const renderPostCard = (post: ProjectListDto | IntroductionListDto) => {
        const isProject = post.type === 'project';
        return (
            <div
                key={post.id}
                onClick={() => router.push(`/board/${post.type}/${post.id}`)}
                style={{ cursor: 'pointer' }}
            >
                <Card
                    header={
                        <div>
                            <Badge size="md" variant="filled" backgroundColor={badgeColor[post.type]}>
                                {isProject ? '📂 프로젝트' : '🦁 프로필'}
                            </Badge>
                        </div>
                    }
                    body={
                        isProject ? (
                            <ProjectCard post={post as ProjectListDto} />
                        ) : (
                            <IntroductionCard post={post as IntroductionListDto} />
                        )
                    }
                    footer={
                        <div className={styles.cardFooter}>
                            <div>❤️ {post.likeCount}</div>
                            <div>{post.daysAgo}일전</div>
                        </div>
                    }
                />
            </div>
        );
    };

    return (
        <div>
            <PopularCarousel slides={popularPosts.map(renderPostCard)} options={OPTIONS} />
            <Tab />
            <FloatButton />
        </div>
    );
}

const ProjectCard = ({ post }: { post: ProjectListDto }) => (
    <div className={`${styles.cardBody} ${styles.projectCard}`}>
        <div className={styles.projectInfo}>
            <h3>{post.title}</h3>
        </div>
        <div className={styles.projectPosition}>
            {post.positions.map((position) => (
                <Badge key={position.id} size="sm" variant="filled" backgroundColor="#000000">
                    {position.name}
                </Badge>
            ))}
        </div>
        <div className={styles.skillList}>
            {post.skills.map((skill) => (
                <SkillBadge key={skill.id} type="icon" name={skill.name} />
            ))}
        </div>
    </div>
);

const IntroductionCard = ({ post }: { post: IntroductionListDto }) => (
    <div className={styles.cardBody}>
        <div className={styles.introLeft}>
            <div className={styles.introUser}>
                <h3>{post.user.nickname}</h3>
                <p>{post.positions.map((p) => p.name).join(', ')}</p>
            </div>
            <div>{post.title}</div>
            <div className={styles.skillList}>
                {post.skills.map((skill) => (
                    <SkillBadge key={skill.id} type="icon" name={skill.name} />
                ))}
            </div>
        </div>
        <div className={styles.introRight}>
            <img
                src={post.user.avatarUrl}
                alt="프로필"
                onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = 'https://codingapplecdn.com/wp-content/uploads/2023/01/food0.png';
                }}
            />
        </div>
    </div>
);
