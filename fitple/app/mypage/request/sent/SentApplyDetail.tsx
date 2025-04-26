import styles from "./SentApplyDetail.module.scss";
import Modal from "@/components/Modal/Modal";
import Link from "next/link";
import { ApplyApplicantDto } from "@/back/apply/application/usecases/dto/ApplyApplicantDto";

type Props = {
    closeModal: () => void;
    isOpen: boolean;
    applys: ApplyApplicantDto;
};
const statusTextMap: Record<"waiting" | "accept" | "reject", string> = {
    waiting: "대기중",
    accept: "수락됨",
    reject: "거절됨",
};

const SentApplyDetail = ({ closeModal, isOpen, applys }: Props) => {
    if (!isOpen) return null; // 모달이 열릴 때만 렌더링 되도록 처리

    return (
        <>
            <Modal
                closeButton
                onClose={closeModal}
                header={
                    <div className={styles.title}>
                        <Link href={`/board/project/${applys.projectId}`}>{applys.title}</Link>
                    </div>
                }
                body={
                    <div>
                        <div className={styles.contentTitle}>보낸 메세지</div>
                        <div className={styles.content}>{applys.message}</div>
                    </div>
                }
                footer={
                    <div className={styles.status}>
                        <span className={`${styles.statusBadge} ${styles[applys.status]}`}>
                            {statusTextMap[applys.status]}
                        </span>
                    </div>
                }
            />
        </>
    );
};

export default SentApplyDetail;
