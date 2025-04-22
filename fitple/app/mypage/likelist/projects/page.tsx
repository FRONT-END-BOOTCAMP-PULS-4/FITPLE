import styles from './page.module.scss'
import MyPageCard from '../../components/MyPageCard';

const LikeProjectPage = () => {
    return (
        <div className={styles.container}>
            <MyPageCard />
        </div>
    );
}

export default LikeProjectPage;