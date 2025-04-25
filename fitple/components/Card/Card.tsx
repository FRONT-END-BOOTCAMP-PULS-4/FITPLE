import React, { FC, ReactNode } from 'react';
import styles from './Card.module.scss';

type CardProps = {
    header?: ReactNode; // 상단 커스터마이징
    body: ReactNode; // 본문 커스터마이징
    footer?: ReactNode; // 하단 커스터마이징
    size?: 'sm' | 'md' | 'lg'; // 버튼 크기
};

const Card: FC<CardProps> = ({ header, body, footer, size = 'md', ...props }) => {
    return (
        <div className={`${styles.card} ${styles[size]}`} {...props}>
            {/* 상단: header는 있으면 렌더링 */}
            <div className={styles.cardHeader}>{header}</div>

            <div className={styles.cardBody}>{body}</div>

            {/* 하단: footer가 있으면 렌더링 */}
            {footer && <div className={styles.cardFooter}>{footer}</div>}
        </div>
    );
};

export default Card;
