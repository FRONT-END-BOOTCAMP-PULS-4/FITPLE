'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './page.module.scss';
import SkillBadge from '@/components/Badge/SkillBadge';
import Badge from '@/components/Badge/Badge';
const ProjectDetailPage = () => {
    const params = useParams();
    const id = params?.id as string;
    console.log(id);
    const [project, setProject] = useState<any>(null);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const res = await fetch(`/api/projects/${id}`);
                if (!res.ok) {
                    throw new Error('Failed to fetch project');
                }
                const data = await res.json();
                setProject(data);
            } catch (error) {
                console.error('Error fetching project:', error);
            }
        };

        fetchProject();
    }, []);

    if (!project) {
        return <div>로딩 중...</div>;
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.breadcrumb}>어서와요 &gt;</div>
            <h1 className={styles.title}>{project.title}</h1>

            <div className={styles.header}>
                <div className={styles.userInfo}>
                    <img src={project.user.image} alt="유저 이미지" className={styles.profileImage} />
                    <div>
                        <div className={styles.nickname}>{project.user.nickname}</div>
                        <div className={styles.date}>{project.createdAt}</div>
                    </div>
                </div>
            </div>

            <div className={styles.divider} />
            <div className={styles.badgeSection}>
                <div>
                    <strong>구분</strong>
                    <Badge size="sm" variant="outlined">
                        {project.workMode}
                    </Badge>
                </div>
                <div>
                    <strong>예상 기간</strong>
                    <Badge size="sm" variant="outlined">
                        {project.duration}
                    </Badge>
                </div>
                <div>
                    <strong>기술 스택</strong>
                    <div className={styles.stackBadges}>
                        {project.skills.map((skill: any) => (
                            <SkillBadge key={skill.id} name={skill.name} type="icon" />
                        ))}
                    </div>
                </div>
                <div>
                    <strong>모집 포지션</strong>
                    <div className={styles.stackBadges}>
                        {project.positions.map((pos: any) => (
                            <Badge key={pos.id} variant="filled" size="sm" backgroundColor="#12B76A">
                                {pos.name}
                            </Badge>
                        ))}
                    </div>
                </div>
            </div>

            <div className={styles.divider} />
            <div className={styles.description}>
                {/* {project.description.split('\n').map((line: string, idx: number) => (
                    <p key={idx}>{line}</p>
                ))} */}
                디스크립션
            </div>

            <div className={styles.footer}>
                <span>❤️ {project.likeCount}</span>
                <button className={styles.applyButton}>요청 보내기</button>
            </div>
        </div>
    );
};

export default ProjectDetailPage;
