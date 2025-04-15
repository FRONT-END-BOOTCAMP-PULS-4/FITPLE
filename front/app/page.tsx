import styles from './page.module.scss';

export default function Home() {
    return (
        <div>
            <div className={styles.base}>기본! 123</div>
            <div className={styles.toss}>토스! 123</div>
        </div>
    );
}
