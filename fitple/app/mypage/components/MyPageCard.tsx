import Badge from '@/components/Badge/Badge'
import styles from './MyPageCard.module.scss'

const MyPageCard = () => {
    return (
        <div className={styles.cardContainer}>
            <div className={styles.cardBox}>
                <div className={styles.infoBox}>
                    <Badge></Badge>
                    <span className={styles.titleText}>안녕하세요 ! 프론트엔드 개발자 서현우 입니다 !</span>
                    <span className={styles.positionText}>프론트엔드</span>
                    <span className={styles.likeText}>❤️ 10</span>
                </div>
                <div className={styles.dayBox}>
                    <span className={styles.dateText}>1일전같은 곳</span>
                </div>
            </div>
        </div>
    );
}


export default MyPageCard;