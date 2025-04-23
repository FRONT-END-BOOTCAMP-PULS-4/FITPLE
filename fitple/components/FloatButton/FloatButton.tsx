"use client";

import React, { useState } from 'react';
import styles from './FloatButton.module.scss';
import Image from 'next/image';
import Link from 'next/link';

const FloatButton: React.FC = () => {
    const [open, setOpen] = useState(false);

    const toggleButtons = () => {
        setOpen(!open);
    };

    return (
        <div className={styles.floatContainer}>
            <div className={`${styles.additionalButton} ${open ? styles.show : ''}`}>
                <Link href="board/introduction/write" className={styles.floatButtonProfile}>
                    <Image src="/images/account.png" alt="Profile" width={24} height={24} />
                </Link>
                <Link href="board/project/write" className={styles.floatButtonProject}>
                <Image src="/images/team.png" alt="Project" width={24} height={24} />
                </Link>
            </div>
            <button className={styles.floatButton} onClick={toggleButtons}>
                <Image src="/images/pencil.png" alt="Add" width={24} height={24} />
            </button>
        </div>
    );
};

export default FloatButton;
