import styles from './Footer.module.scss';
import Image from 'next/image';

const Footer = () => {
    return (
        <div className={styles.footerContainer}>
            <div className={styles.innerWrapper}>
                <Image src="/images/logo-blue.svg" alt="logo" width={120} height={50} />
                <span className={styles.footerSpan}>
                    멋쟁이 사자처럼 프론트엔드 심화 4기 - 2조 핏플팀
                    <br />
                    Copyright © 2025 멋쟁이사자처럼 All rights reserved
                </span>
            </div>
        </div>
    );
};

export default Footer;
