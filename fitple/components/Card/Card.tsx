"use client";

import React, { FC, ReactNode, useEffect, useState } from "react";
import styles from "./Card.module.scss";

type CardProps = {
    header?: ReactNode;
    body: ReactNode;
    footer?: ReactNode;
    size?: "sm" | "md" | "lg";
    isLoading?: boolean;
};

const Card: FC<CardProps> = ({ header, body, footer, size = "md", isLoading, ...props }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (!isLoading) {
            setIsVisible(true); // 데이터가 로드되면 visible 상태 변경
        }
    }, [isLoading]);
    return (
        <>
            <div className={`${styles.card} ${styles[size]} ${isVisible ? styles.show : ""}`} {...props}>
                <div className={styles.cardHeader}>{header}</div>
                <div className={styles.cardBody}>{body}</div>
                {footer && <div className={styles.cardFooter}>{footer}</div>}
            </div>
        </>
    );
};

export default Card;
