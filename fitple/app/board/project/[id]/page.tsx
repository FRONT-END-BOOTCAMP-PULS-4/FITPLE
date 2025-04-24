"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./page.module.scss";
import SkillBadge from "@/components/Badge/SkillBadge";
import Badge from "@/components/Badge/Badge";
import Button from "@/components/Button/Button";
import { ProjectListDto } from "@/back/project/application/usecases/dto/ProjectListDto";
import Image from "next/image";
const ProjectDetailPage = () => {
    const params = useParams();
    const id = params?.id as string;
    const [project, setProject] = useState<ProjectListDto | null>(null);
    const workModeMap: Record<"online" | "offline", string> = {
        online: "온라인",
        offline: "오프라인",
    };
    const statusMap: Record<"open" | "closed", string> = {
        open: "모집 중",
        closed: "모집 완료",
    };

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const res = await fetch(`/api/projects/${id}`);
                if (!res.ok) {
                    throw new Error("Failed to fetch project");
                }
                const data = await res.json();
                setProject(data);
            } catch (error) {
                console.error("Error fetching project:", error);
            }
        };

        fetchProject();
    }, []);

    if (!project) {
        return <div>로딩 중...</div>;
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <p className={styles.breadcrumb}>어서와요 &gt;</p>
                <h1 className={styles.title}>{project.title}</h1>
                <div className={styles.userInfo}>
                    <Image src={project.user.avatarUrl} alt="이미지" className={styles.avatar} />
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
                        <Badge key={pos.id} variant="filled" size="sm" backgroundColor="#12B76A">
                            {pos.name}
                        </Badge>
                    ))}
                </div>
            </div>

            {/* 구분선 */}
            <div className={styles.divider} />

            {/* 설명 부분 */}
            <div className={styles.description}>
                {project.content}
                핏플이라는 프로젝트를 진행하려고 합니다 ! 핏플은 개발자들이 함께할 사람을 더 쉽게, 더 따뜻하게 만날 수
                있도록 도와주는 플랫폼입니다. 지금도 수많은 사람들이 디스코드, 노션, 커뮤니티를 전전하며 팀원을 찾고
                있죠. 핏플은 ‘모집글 중심의 단방향 구조’를 넘어,‘나를 소개하는 카드’와 ‘서로 연결되는 경험’을 중심으로
                만들고자 합니다. 현재 모집하고자 하는 포지션은 프론트엔드, 디자이너 입니다. 많은 요청 보내주세요 !
            </div>

            {/* 좋아요 + 요청 버튼 */}
            <div className={styles.footer}>
                <Button size="md" variant="cancel">
                    ❤️ {project.likeCount}
                </Button>
                <Button size="md" variant="confirm">
                    지원하기
                </Button>
            </div>
        </div>
    );
};

export default ProjectDetailPage;
