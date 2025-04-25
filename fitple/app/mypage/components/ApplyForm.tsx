'use client';

import styles from './ApplyForm.module.scss';
import Button from '@/components/Button/Button';
import Modal from '@/components/Modal/Modal';
import Textarea from '@/components/Textarea/Textarea';
import { useState } from 'react';
import { useAuthStore } from '@/stores/authStore';
type Props = {
    closeModal: () => void;
    isOpen: boolean;
    id: number;
};

const ApplyForm = ({ closeModal, isOpen, id }: Props) => {
    const [textarea, setTextarea] = useState('');
    const { id: userId } = useAuthStore();

    const handleApply = async () => {
        console.log('지원서 내용:', textarea);
        closeModal();
        setTextarea('');
        const params = {
            userId: userId,
            projectId: id,
            message: textarea,
            status: 'waiting',
        };
        try {
            const res = await fetch(`/api/member/apply`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(params),
            });
            if (!res.ok) {
                throw new Error('Failed to fetch project');
            }
            const data = await res.json();
            console.log(data);
        } catch (error) {
            console.error('Error fetching project:', error);
        }
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
