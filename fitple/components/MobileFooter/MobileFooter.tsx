import styles from './MobileFooter.module.scss';
import Team from '@/assets/icons/teams.svg';
import Home from '@/assets/icons/home.svg';
import User from '@/assets/icons/user.svg';


const MobileFooter: React.FC = () => {
    return (
        <div className={styles.footerContainer}>
            <Team width={30} height={30} />
            <Home width={30} height={30} />
            <User width={30} height={30} />
        </div>
    );
};

export default MobileFooter;