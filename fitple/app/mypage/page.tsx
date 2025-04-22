import styles from './page.module.scss'
import Link from 'next/link';

export default function RootMyPage() {
    return (
        <div className={styles.myInfoContainer}>
            <div className={styles.imageBox}></div>
            <div className={styles.userInfo}>
                <span className={styles.userNickname}>하랑이</span>
                <div className={styles.userPosicareerContainer}>
                    <span className={styles.userPosicareer}>프론트엔드 개발자</span>
                    <span className={styles.userPosicareer}>신입</span>
                </div>
            </div>
            <Link href={'/mypage/edit'} className={styles.editButton}>수정하기</Link>
            <div className={styles.stackContainer}>
                <span className={styles.stackHeader}>나의 기술스택은?</span>
                <div className={styles.stackBox}>기술스택 들어갈 곳입니다.</div>
            </div>
        </div>
    );
}
