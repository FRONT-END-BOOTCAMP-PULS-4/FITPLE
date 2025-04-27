"use client";

import Card from "@/components/Card/Card";
import styles from "./page.module.scss";
import { useModal } from "@/hooks/useModal";
import { ApplyApplicantDto } from "@/back/apply/application/usecases/dto/ApplyApplicantDto";
import { useState } from "react";
import ReceivedApplyDetail from "./ReceivedApplyDetail";
import { useReceivedReq } from "@/hooks/useReceivedReq";
import { OfferListDto } from "@/back/offer/application/usecases/dto/OfferListDto";
import ReceivedOfferDetail from "./ReceivedOfferDetail";

export default function ReceivedPage() {
    const { applys, offers, loading, error } = useReceivedReq();
    const { openModal: openApplyModal, isOpen: isApplyOpen, closeModal: closeApplyModal } = useModal();
    const { openModal: openOfferModal, isOpen: isOfferOpen, closeModal: closeOfferModal } = useModal();
    const [selectedApply, setSelectedApply] = useState<ApplyApplicantDto | null>(null);
    const [selectedOffer, setSelectedOffer] = useState<OfferListDto | null>(null);

    const allPosts = [...applys, ...offers];
    if (!loading) return <div>로딩 중...</div>;
    if (error) return <div>에러 발생: {error}</div>;
    const handleClick = (post: ApplyApplicantDto | OfferListDto) => {
        console.log(post);

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
                <ReceivedApplyDetail
                    isOpen={isApplyOpen}
                    closeModal={closeApplyModal}
                    id={selectedApply.id}
                    applys={selectedApply}
                />
            )}

            {isOfferOpen && selectedOffer && (
                <ReceivedOfferDetail
                    isOpen={isOfferOpen}
                    closeModal={closeOfferModal}
                    id={selectedOffer.id}
                    offers={selectedOffer}
                />
            )}
        </div>
    );
}
