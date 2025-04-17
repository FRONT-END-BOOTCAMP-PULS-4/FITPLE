import styles from './Header.module.scss';
import Image from 'next/image';

const Header = () => {
    return (
        <div className={styles.headerContainer}>
            <Image
                src="/images/logo-blue.png"
                alt="logo"
                width={120}
                height={50}
             />
            <ul className={styles.ulStyles}>
                <li><div className={`${styles.userIcon}`} /></li>
                <li><div className={`${styles.notificationIcon}`} /></li>
            </ul>
        </div>
    );
};

export default Header;
