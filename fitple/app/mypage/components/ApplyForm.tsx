'use client';

import styles from './ApplyForm.module.scss';
import Button from '@/components/Button/Button';
import Modal from '@/components/Modal/Modal';
import Textarea from '@/components/Textarea/Textarea';
import { useState } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { applyFormService } from '@/app/board/project/service/applyFormService';

type Props = {
    closeModal: () => void;
    isOpen: boolean;
    id: number;
};

export type ApplyFormData = {
    projectId: number;
    message: string;
    status: string;
};

const ApplyForm = ({ closeModal, isOpen, id }: Props) => {
    const [textarea, setTextarea] = useState('');
    const { token } = useAuthStore();

    const handleApply = async () => {
        const params = {
            projectId: id,
            message: textarea,
            status: 'waiting',
        };
        await applyFormService(token!, params);
        setTextarea('');
        closeModal();
    };

    return (
        <>
            {isOpen && (
                <Modal
                    header={<div className={styles.modalHeader}>지원서 작성</div>}
                    body={
                        <Textarea
                            size="md"
                            placeholder={`예시)
- 어떤 점에서 이 프로젝트에 끌렸는지
- 이전에 했던 관련 경험
 - 어떤 방식으로 기여하고 싶은지 등을 작성해보세요.`}
                            value={textarea}
                            onChange={(e) => setTextarea(e.target.value)}
                        />
                    }
                    footer={
                        <div className={styles.btnBox}>
                            <Button variant="cancel" size="md" onClick={closeModal}>
                                취소하기
                            </Button>
                            <Button variant="confirm" size="md" onClick={handleApply}>
                                지원하기
                            </Button>
                        </div>
                    }
                    onClose={closeModal}
                />
            )}
        </>
    );
};

export default ApplyForm;
