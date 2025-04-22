import styles from './page.module.scss';
import MyPageCard from '../../components/MyPageCard';

const LikeProfilePage = () => {
    return (
        <div className={styles.container}>
        <MyPageCard />
        </div>
    );
}

export default LikeProfilePage;