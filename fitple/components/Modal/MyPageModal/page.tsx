import React from 'react';
import Image from 'next/image'; // next/image import
import styles from './page.module.scss';

type ModalProps = {
    header?: React.ReactNode;
    body: React.ReactNode;
    footer?: React.ReactNode;
    closeButton?: boolean; // 닫기 버튼 표시 여부
    onClose: () => void;
};

const MyPageModal: React.FC<ModalProps> = ({
    header,
    body,
    footer,
    closeButton = false, // 기본값: 닫기 버튼 없음
    onClose,
}) => {
    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                {/* 닫기 버튼 */}
                {closeButton && (
                    <button className={styles.modalCloseButton} onClick={onClose}>
                        <Image src="/images/closeButton.svg" alt="닫기 버튼" width={24} height={24} />
                    </button>
                )}
                {/* 상단: header가 있으면 렌더링 */}
                {header && <div>{header}</div>}
                {/* 본문 */}
                <div className={styles.body}>{body}</div>
                {/* 하단: footer가 있으면 렌더링 */}
                {footer && <div>{footer}</div>}
            </div>
        </div>
    );
};

export default MyPageModal;
