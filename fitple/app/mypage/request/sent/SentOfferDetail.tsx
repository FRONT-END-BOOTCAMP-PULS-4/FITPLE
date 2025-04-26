import styles from "./SentOfferDetail.module.scss";
import Modal from "@/components/Modal/Modal";
import Link from "next/link";
import { OfferListDto } from "@/back/offer/application/usecases/dto/OfferListDto";

type Props = {
    closeModal: () => void;
    isOpen: boolean;
    offers: OfferListDto;
};
const statusTextMap: Record<"waiting" | "accept" | "reject", string> = {
    waiting: "대기중",
    accept: "수락됨",
    reject: "거절됨",
};

const SentOfferDetail = ({ closeModal, isOpen, offers }: Props) => {
    if (!isOpen) return null; // 모달이 열릴 때만 렌더링 되도록 처리

    return (
        <>
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
                        <div className={styles.contentTitle}>보낸 메세지</div>
                        <div className={styles.content}>{offers.message}</div>
                    </div>
                }
                footer={
                    <div className={styles.footerInfo}>
                        <Link href={`/board/introduction/${offers.introductionId}`}>
                            <div className={styles.userInfo}>
                                <img src={offers.avatarUrl} alt="이미지" className={styles.userImg} />
                                <span>{offers.nickname}</span>
                            </div>
                        </Link>

                        <div className={styles.status}>
                            <span className={`${styles.statusBadge} ${styles[offers.status]}`}>
                                {statusTextMap[offers.status]}
                            </span>
                        </div>
                    </div>
                }
            />
        </>
    );
};

export default SentOfferDetail;
