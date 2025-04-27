"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./page.module.scss";
import SkillBadge from "@/components/Badge/SkillBadge";
import Badge from "@/components/Badge/Badge";
import Button from "@/components/Button/Button";
import Image from "next/image";
import { IntroductionDetailDto } from "@/back/introduction/application/usecases/dto/IntroductionDetailDto";
import { useModal } from "@/hooks/useModal";
import OfferForm from "@/app/board/introduction/components/OfferForm";
import { useAuthStore } from "@/stores/authStore";

const IntroductionPage = () => {
    const params = useParams();
    const id = params?.id as string;
    const [introduction, setIntroduction] = useState<IntroductionDetailDto | null>(null);
    const { openModal, isOpen, closeModal } = useModal();
    const [isMyIntroduction, setIsMyIntroduction] = useState(false);
    const { token } = useAuthStore();

    const workModeMap: Record<"online" | "offline", string> = {
        online: "온라인",
        offline: "오프라인",
    };

    const statusMap: Record<"open" | "closed", string> = {
        open: "가능",
        closed: "불가능",
    };

    useEffect(() => {
        const fetchIntroduction = async () => {
            try {
                const res = await fetch(`/api/introductions/${id}`);
                if (!res.ok) {
                    throw new Error("Failed to fetch introduction");
                }
                const data = await res.json();
                setIntroduction(data);
            } catch (error) {
                console.error("Error fetching introduction:", error);
            }
        };

        fetchIntroduction();
    }, [id]);

    useEffect(() => {
        const fetchMyIntroduction = async () => {
            try {
                if (token) {
                    const res = await fetch(`/api/member/introductions/${id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    if (!res.ok) {
                        throw new Error("Failed to fetch Introduction");
                    }
                    const data = await res.json();
                    setIsMyIntroduction(data);
                }
            } catch (error) {
                console.error("Error fetching Introduction:", error);
            }
        };

        fetchMyIntroduction();
    }, [token, id]);

    if (!introduction) {
        return <div>로딩 중...</div>;
    }

    return (
        <div className={styles.wrapper}>
            {isOpen && <OfferForm isOpen={isOpen} closeModal={closeModal} introductionId={Number(id)} />}
            <div className={styles.header}>
                <p className={styles.breadcrumb}>데려가요 &gt;</p>
                <h1 className={styles.title}>{introduction.title}</h1>
                <div className={styles.userInfo}>
                    <Image
                        src={introduction.user.avatarUrl}
                        alt="이미지"
                        className={styles.avatar}
                        width={50}
                        height={50}
                    />
                    <div className={styles.nicknameDateGap}>
                        <div className={styles.nickname}>{introduction.user.nickname}</div>
                        <div className={styles.date}>{introduction.createdAt}</div>
                    </div>
                </div>
            </div>
            <div className={styles.divider} />

            <div className={styles.metaAndStackWrapper}>
                <div className={styles.leftMetaGroup}>
                    <div className={styles.metaItem}>
                        <div className={styles.metaLabel}>구분</div>
                        <div className={styles.metaValue}>{workModeMap[introduction.workMode]}</div>
                    </div>
                    <div className={styles.stackGroup}>
                        <span className={styles.metaLabel}>기술 스택</span>
                        <div className={styles.badgeGroup}>
                            {introduction.skills.map((skill: { id: number; name: string }) => (
                                <SkillBadge key={skill.id} name={skill.name} type="icon" logoSize={30} />
                            ))}
                        </div>
                    </div>
                </div>

                <div className={styles.rightMetaGroup}>
                    <div className={styles.statusGroup}>
                        <span className={styles.metaLabel}>상태</span>
                        <Badge size="md" variant="filled">
                            {statusMap[introduction.status]}
                        </Badge>
                    </div>
                </div>
            </div>

            <div className={styles.positionGroup}>
                <span className={styles.metaLabel}>희망 포지션</span>
                <div className={styles.badgeGroup}>
                    {introduction.positions.map((pos: { id: number; name: string }) => (
                        <Badge
                            key={pos.id}
                            variant="filled"
                            size="sm"
                            role={pos.name as "FE" | "BE" | "DI" | "PM" | "FS"}
                        >
                            {pos.name}
                        </Badge>
                    ))}
                </div>
            </div>

            <div className={styles.divider} />

            <div className={styles.description}>{introduction.content}</div>

            <div className={styles.footer}>
                <Button size="md" variant="cancel">
                    ❤️ {introduction.likeCount}
                </Button>
                <Button
                    size="md"
                    variant="confirm"
                    onClick={() => openModal()}
                    style={{ color: "black" }}
                    disabled={isMyIntroduction}
                >
                    제안하기
                </Button>
            </div>
        </div>
    );
};

export default IntroductionPage;
