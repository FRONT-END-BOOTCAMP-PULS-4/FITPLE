'use client';

import styles from './page.module.scss';
import MobileFooter from '../components/MobileFooter/MobileFooter';

export default function Home() {
    return (
        <div>
            <MobileFooter />
            <div className={styles.base}>기본! 123</div>
            <div className={styles.toss}>토스! 123</div>
        </div>
    );
}
