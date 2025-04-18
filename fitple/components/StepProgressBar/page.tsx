'use client';
import React from 'react';
import styles from './page.module.scss';

interface StepProgressBarProps {
    step: number;
}

const StepProgressBar: React.FC<StepProgressBarProps> = ({ step }) => {
    return (
        <div className={styles.stepperWrapper}>
            <div className={`${styles.stepperItem} ${step > 1 ? styles.completed : step === 1 ? styles.active : ''}`}>
                <div className={styles.stepCounter}>1</div>
            </div>
            <div className={`${styles.stepperItem} ${step > 2 ? styles.completed : step === 2 ? styles.active : ''}`}>
                <div className={styles.stepCounter}>2</div>
            </div>
            <div className={`${styles.stepperItem} ${step > 3 ? styles.completed : step === 3 ? styles.active : ''}`}>
                <div className={styles.stepCounter}>3</div>
            </div>
            <div className={`${styles.stepperItem} ${step === 4 ? styles.active : ''}`}>
                <div className={styles.stepCounter}>4</div>
            </div>
        </div>
    );
};

export default StepProgressBar;
