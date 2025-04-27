import React, { useState } from "react";
import styles from "./ReceivedOfferDetail.module.scss";
import { useFetchOfferPut } from "@/hooks/useFetchOffer/userFetchOfferPut";
import Link from "next/link";
import { OfferListDto } from "@/back/offer/application/usecases/dto/OfferListDto";
import Modal from "@/components/Modal/Modal";
import Button from "@/components/Button/Button";

type Props = {
    id: number;
    closeModal: () => void;
    isOpen: boolean;
    offers: OfferListDto;
};

const ReceivedOfferDetail = ({ closeModal, isOpen, id, offers }: Props) => {
    const { updateOfferStatus, loading, error, success } = useFetchOfferPut();
    if (error) return null;
    if (!isOpen) return null; // 모달이 열릴 때만 렌더링 되도록 처리
    const handleStatusChange = async (newStatus: "accept" | "reject") => {
        if (loading) return; // 로딩 중에는 요청을 막음
        try {
            await updateOfferStatus({ offerId: Number(id), status: newStatus });
        } catch (err) {
            console.error("상태 업데이트 오류:", err);
        }
    };
    return (
        <Modal
            closeButton
            onClose={closeModal}
            header={
                <div className={styles.title}>
                    <Link href={`/board/project/${offers.projectId}`}>{offers.title}</Link>
                </div>
            }
            body={
                <div>
                    <div className={styles.contentTitle}>받은 메세지</div>
                    <div className={styles.content}>{offers.message}</div>
                </div>
            }
            footer={
                <div className={styles.btnBox}>
                    <Button variant="confirm" size="md" onClick={() => handleStatusChange("accept")} style={{ color: 'black' }}>
                        수락
                    </Button>
                    <Button variant="cancel" size="md" onClick={() => handleStatusChange("reject")}>
                        거절
                    </Button>
                </div>
            }
        />
    );
};

export default ReceivedOfferDetail;
