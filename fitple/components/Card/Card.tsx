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

const Card: FC<CardProps> = ({ header, body, footer, size = 'md', isLoading = true, ...props }) => {
    // useEffect(() => {
    //     const timeout = setTimeout(() => {
    //         setVisible(true);
    //         console.log('셋타임아웃: ', isLoading);
    //     }, 10); // 마운트 후 살짝 딜레이 후 트리거
    //     return () => clearTimeout(timeout);
    // }, []);
    console.log('값 넘어오나 확인: ', isLoading);
    return (
        <>
            {isLoading ? ( //true였다가 false로 바뀌면서
                <SkeletonCard />
            ) : (
                <div className={`${styles.card} ${styles[size]} ${isLoading ? '' : styles.show}`} {...props}>
                    <div className={styles.cardHeader}>{header}</div>
                    <div className={styles.cardBody}>{body}</div>
                    {footer && <div className={styles.cardFooter}>{footer}</div>}
                </div>
            )}
        </>
    );
};

export default Card;
