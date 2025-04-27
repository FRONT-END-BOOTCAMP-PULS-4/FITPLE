import React from 'react';
import styles from './ReceivedApplyDetail.module.scss';
import { useFetchApplyPut } from '@/hooks/useFetchApply/userFetchApplyPut';
import { ApplyApplicantDto } from '@/back/apply/application/usecases/dto/ApplyApplicantDto';
import Modal from '@/components/Modal/Modal';
import Button from '@/components/Button/Button';

type Props = {
    id: number;
    closeModal: () => void;
    isOpen: boolean;
    applys: ApplyApplicantDto;
};

const ReceivedApplyDetail = ({ closeModal, isOpen, id, applys }: Props) => {
    const { updateApplyStatus, loading } = useFetchApplyPut();
    if (!isOpen) return null; // 모달이 열릴 때만 렌더링 되도록 처리

    const handleStatusChange = async (newStatus: 'accept' | 'reject') => {
        if (loading) return; // 로딩 중에는 요청을 막음
        try {
            await updateApplyStatus({
                applyId: Number(id),
                status: newStatus,
                projectId: Number(applys.projectId),
                applyUserId: applys.userId,
            });
            closeModal();
        } catch (err) {
            console.error('상태 업데이트 오류:', err);
        }
    };
    return (
        <>
            <Modal
                closeButton
                onClose={closeModal}
                body={
                    <div>
                        <div className={styles.userInfo}>
                            <img src={applys.avatarUrl} alt="이미지" className={styles.userImg} />
                            <div>{applys.nickname}</div>
                        </div>
                        <div className={styles.contentTitle}>받은 메세지</div>
                        <div className={styles.content}>{applys.message}</div>
                    </div>
                }
                footer={
                    <div className={styles.btnBox}>
                        <Button
                            variant="confirm"
                            size="md"
                            onClick={() => handleStatusChange('accept')}
                            style={{ color: 'black' }}
                        >
                            수락
                        </Button>
                        <Button variant="cancel" size="md" onClick={() => handleStatusChange('reject')}>
                            거절
                        </Button>
                    </div>
                }
            />
        </>
    );
};

export default ReceivedApplyDetail;
