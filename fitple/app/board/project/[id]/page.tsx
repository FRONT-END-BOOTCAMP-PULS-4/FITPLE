'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './page.module.scss';
import SkillBadge from '@/components/Badge/SkillBadge';
import Badge from '@/components/Badge/Badge';
import Button from '@/components/Button/Button';
import Image from 'next/image';
import { ProjectDetailDto } from '@/back/project/application/usecases/dto/ProjectDetailDto';

import { useModal } from '@/hooks/useModal';
import ApplyForm from '@/app/mypage/components/ApplyForm';
import { useAuthStore } from '@/stores/authStore';

const ProjectDetailPage = () => {
    const { openModal, isOpen, closeModal } = useModal();
    const { token } = useAuthStore();
    const router = useRouter();
    const params = useParams();
    const id = params?.id as string;
    const [project, setProject] = useState<ProjectDetailDto | null>(null);
    const [isExist, setIsExist] = useState(false);
    const [isMyProject, setIsMyProject] = useState(false);

    const workModeMap: Record<'online' | 'offline', string> = {
        online: '온라인',
        offline: '오프라인',
    };
    const statusMap: Record<'open' | 'closed', string> = {
        open: '모집 중',
        closed: '모집 완료',
    };

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
    }, [id]);

    useEffect(() => {
        const fetchCheckApply = async () => {
            try {
                if (token) {
                    const res = await fetch(`/api/member/apply/check?projectId=${id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    if (!res.ok) {
                        throw new Error('Failed to fetch project');
                    }
                    const data = await res.json();
                    setIsExist(data);
                }
            } catch (error) {
                console.error('Error fetching project:', error);
            }
        };

        fetchCheckApply();
    }, [token, id]);

    useEffect(() => {
        const fetchMyProject = async () => {
            try {
                if (token) {
                    const res = await fetch(`/api/member/projects/${id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    if (!res.ok) {
                        throw new Error('Failed to fetch project');
                    }
                    const data = await res.json();
                    setIsMyProject(data);
                }
            } catch (error) {
                console.error('Error fetching project:', error);
            }
        };

        fetchMyProject();
    }, [token, id]);

    const handleApply = () => {
        if (token) {
            openModal();
        } else {
            alert('로그인이 필요합니다.');
            router.push('/login');
        }
    };

    if (!project) return <div>로딩 중...</div>;

    return (
        <div className={styles.wrapper}>
            {isOpen && <ApplyForm isOpen={isOpen} closeModal={closeModal} id={Number(id)} />}
            <div className={styles.header}>
                <p className={styles.breadcrumb}>어서와요 &gt;</p>
                <h1 className={styles.title}>{project.title}</h1>
                <div className={styles.userInfo}>
                    <Image src={project.user.avatarUrl} width={50} height={50} alt="이미지" className={styles.avatar} />
                    <div className={styles.nicknameDateGap}>
                        <div className={styles.nickname}>{project.user.nickname}</div>
                        <div className={styles.date}>{project.createdAt}</div>
                    </div>
                </div>
            </div>
            <div className={styles.divider} />

            <div className={styles.metaAndStackWrapper}>
                {/* 좌측 그룹: 구분 / 예상 기간 */}
                <div className={styles.leftMetaGroup}>
                    <div className={styles.metaItem}>
                        <div className={styles.metaLabel}>구분</div>
                        <div className={styles.metaValue}>{workModeMap[project.workMode]}</div>
                    </div>
                    <div className={styles.stackGroup}>
                        <span className={styles.metaLabel}>기술 스택</span>
                        <div className={styles.badgeGroup}>
                            {project.skills.map((skill: { id: number; name: string }) => (
                                <SkillBadge key={skill.id} name={skill.name} type="icon" logoSize={30} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* 우측 그룹: 기술 스택 / 모집 상태 */}
                <div className={styles.rightMetaGroup}>
                    <div className={styles.metaItem}>
                        <div className={styles.metaLabel}>예상 기간</div>
                        <div className={styles.metaValue}>약 {project.duration}개월</div>
                    </div>
                    <div className={styles.statusGroup}>
                        <span className={styles.metaLabel}>모집 상태</span>
                        <Badge size="md" variant="filled">
                            {statusMap[project.status]}
                        </Badge>
                    </div>
                </div>
            </div>

            {/* 모집 포지션 */}
            <div className={styles.positionGroup}>
                <span className={styles.metaLabel}>모집 포지션</span>
                <div className={styles.badgeGroup}>
                    {project.positions.map((pos: { id: number; name: string }) => (
                        <Badge
                            key={pos.id}
                            variant="filled"
                            size="sm"
                            role={pos.name as 'FE' | 'BE' | 'DI' | 'PM' | 'FS'}
                        >
                            {pos.name}
                        </Badge>
                    ))}
                </div>
            </div>

            {/* 구분선 */}
            <div className={styles.divider} />

            {/* 설명 부분 */}
            <div className={styles.description}>{project.content}</div>

            {/* 좋아요 + 요청 버튼 */}
            <div className={styles.footer}>
                <Button size="md" variant="cancel">
                    ❤️ {project.likeCount}
                </Button>
                <Button
                    size="md"
                    variant="confirm"
                    onClick={handleApply}
                    style={{ color: 'black' }}
                    disabled={isMyProject || isExist}
                >
                    지원하기
                </Button>
            </div>
        </div>
    );
};

export default ProjectDetailPage;
