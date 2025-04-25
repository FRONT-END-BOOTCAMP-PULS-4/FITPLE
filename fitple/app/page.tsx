'use client';

import PopularCarousel from '@/components/Carousel/PopularCarousel/PopularCarousel';
import { EmblaOptionsType } from 'embla-carousel';
import Card from '@/components/Card/Card';
import { Tab } from '@/components/Tab/Tab';
import FloatButton from '@/components/FloatButton/FloatButton';
import { useRouter } from 'next/navigation';
import Badge from '@/components/Badge/Badge';
import styles from './page.module.scss';
import { useEffect, useState, useCallback } from 'react';
import { ProjectListDto } from '@/back/project/application/usecases/dto/ProjectListDto';
import { IntroductionListDto } from '@/back/introduction/application/usecases/dto/IntroductionListDto';
import ProjectCard from './RootComponent/ProjectCard';
import IntroductionCard from './RootComponent/IntroductionCard';
import ProjectCardB from './RootComponent/ProjectCardB';
import IntroductionCardB from './RootComponent/IntroductionCardB';

export default function Home() {
    const router = useRouter();
    const OPTIONS: EmblaOptionsType = {};
    const badgeColor = {
        project: 'var(--brand-color)',
        introduction: 'var(--lion-color)',
    } as const;
    const [projects, setProjects] = useState<ProjectListDto[]>([]);
    const [introductions, setIntroductions] = useState<IntroductionListDto[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    console.log('처음상태 : ', isLoading);
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
            setIsLoading(false);
            console.log('fetch후 상태 : ', isLoading);
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
                    isLoading={isLoading}
                    header={
                        <div>
                            <Badge size="md" variant="filled" backgroundColor={badgeColor[post.type]}>
                                {isProject ? '📂 프로젝트' : '🦁 프로필'}
                            </Badge>
                        </div>
                    }
                    body={
                        isProject ? (
                            <ProjectCardB post={post as ProjectListDto} />
                        ) : (
                            <IntroductionCardB post={post as IntroductionListDto} />
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
