'use client';

import { useRouter } from 'next/navigation';
import { ProjectListDto } from '@/back/project/application/usecases/dto/ProjectListDto';
import { IntroductionListDto } from '@/back/introduction/application/usecases/dto/IntroductionListDto';
import Card from '@/components/Card/Card';
import Badge from '@/components/Badge/Badge';
import styles from '../page.module.scss';
import PopularCarousel from '@/components/Carousel/PopularCarousel/PopularCarousel';
import { EmblaOptionsType } from 'embla-carousel';
import ProjectCardB from './ProjectCardB';
import IntroductionCardB from './IntroductionCardB';

type Props = {
    projects: ProjectListDto[];
    introductions: IntroductionListDto[];
    isLoading: boolean;
};

const badgeColor = {
    project: 'var(--brand-color)',
    introduction: 'var(--lion-color)',
} as const;

export default function PopularPosts({ projects, introductions, isLoading }: Props) {
    const router = useRouter();
    const OPTIONS: EmblaOptionsType = {};

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

    return <PopularCarousel slides={popularPosts.map(renderPostCard)} options={OPTIONS} />;
}
