import styles from './Card.module.scss';

export const SkeletonCard = () => (
    <div className={styles.skeletonContent}>
        <div className={styles.skeletonLine} />
        <div className={styles.skeletonLine} style={{ width: '60%' }} />
    </div>
);
