"use client";

import Card from "@/components/Card/Card";
import styles from "./page.module.scss";
import { useModal } from "@/hooks/useModal";
import { ApplyApplicantDto } from "@/back/apply/application/usecases/dto/ApplyApplicantDto";
import { useState } from "react";
import { OfferListDto } from "@/back/offer/application/usecases/dto/OfferListDto";
import { useSentReq } from "@/hooks/useSentReq";
import SentApplyDetail from "./SentApplyDetail";
import SentOfferDetail from "./SentOfferDetail";
export default function SentPage() {
    const { applys, offers, loading, error } = useSentReq();
    const { openModal: openApplyModal, isOpen: isApplyOpen, closeModal: closeApplyModal } = useModal();
    const { openModal: openOfferModal, isOpen: isOfferOpen, closeModal: closeOfferModal } = useModal();
    const [selectedApply, setSelectedApply] = useState<ApplyApplicantDto | null>(null);
    const [selectedOffer, setSelectedOffer] = useState<OfferListDto | null>(null);

    const allPosts = [...applys, ...offers];
    if (!loading) return <div>로딩 중...</div>;
    if (error) return <div>에러 발생: {error}</div>;
    const handleClick = (post: ApplyApplicantDto | OfferListDto) => {
        if (post.type === "apply") {
            setSelectedApply(post);
            setSelectedOffer(null);
            openApplyModal();
        } else {
            setSelectedOffer(post);
            setSelectedApply(null);
            openOfferModal();
        }
    };
    return (
        <div className={styles.container}>
            {allPosts.map((post) =>
                post.type === "offer" ? (
                    <div
                        key={post.id}
                        className={styles.projectContainer}
                        onClick={() => {
                            handleClick(post);
                        }}
                    >
                        <div className={styles.card}>
                            <header className={styles.cardHeader}>
                                <span>📂 나에게 제안이 들어왔습니다!</span>
                            </header>
                            <div className={styles.cardMessage}>{post.message}</div>
                        </div>
                    </div>
                ) : (
                    <div
                        key={post.id}
                        className={styles.projectContainer}
                        onClick={() => {
                            handleClick(post);
                        }}
                    >
                        <div className={styles.card}>
                            <header className={styles.cardHeader}>
                                <span>📂 프로젝트에 지원이 들어왔습니다!</span>
                            </header>
                            <div className={styles.cardMessage}>{post.message}</div>
                        </div>
                    </div>
                )
            )}

            {isApplyOpen && selectedApply && (
                <SentApplyDetail isOpen={isApplyOpen} closeModal={closeApplyModal} applys={selectedApply} />
            )}

            {isOfferOpen && selectedOffer && (
                <SentOfferDetail isOpen={isOfferOpen} closeModal={closeOfferModal} offers={selectedOffer} />
            )}
        </div>
    );
}
