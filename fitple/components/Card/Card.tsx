'use client';

import React, { FC, ReactNode, useEffect, useState } from 'react';
import styles from './Card.module.scss';
import { SkeletonCard } from './SkeletonCard';

type CardProps = {
    header?: ReactNode;
    body: ReactNode;
    footer?: ReactNode;
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
};

const Card: FC<CardProps> = ({ header, body, footer, size = 'md', isLoading, ...props }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setVisible(true);
            console.log('셋타임아웃: ', isLoading);
        }, 10); // 마운트 후 살짝 딜레이 후 트리거
        return () => clearTimeout(timeout);
    }, []);

    return (
        <>
            {isLoading ? (
                <div>
                    <SkeletonCard />
                    ㅎㅇ
                </div>
            ) : (
                <div className={`${styles.card} ${styles[size]} ${visible ? styles.show : ''}`} {...props}>
                    <div className={styles.cardHeader}>{header}</div>
                    <div className={styles.cardBody}>{body}</div>
                    {footer && <div className={styles.cardFooter}>{footer}</div>}
                </div>
            )}
        </>
    );
};

export default Card;
