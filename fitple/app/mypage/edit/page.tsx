import styles from './edit.module.scss';

const EditInfoPage = () => {
    return (
        <div className={styles.myInfoContainer}>
            <div className={styles.imageBox}></div>
            <div className={styles.imageEditButton}>사진 변경하기</div>
            <div className={styles.editForm}>
                <form>
                    <div className={styles.formGroup}>
                        <label htmlFor="nickname" className={styles.formLabel}>닉네임</label>
                        <input type="text" id="nickname" name="nickname" placeholder="닉네임을 입력하세요" className={styles.formInput} />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="career" className={styles.formLabel}>경력</label>
                        <input type="text" id="career" name="career" placeholder="경력을 입력하세요" className={styles.formInput} />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="job" className={styles.formLabel}>직무</label>
                        <input type="text" id="job" name="job" placeholder="직무를 입력하세요" className={styles.formInput} />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="techStack" className={styles.formLabel}>기술 스택</label>
                        <input type="text" id="techStack" name="techStack" placeholder="기술 스택을 입력하세요" className={styles.formInput} />
                    </div>
                    <div className={styles.buttonGroup}>
                        <button type="submit" className={styles.cancelButton}>취소</button>
                        <button type="submit" className={styles.submitButton}>저장</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditInfoPage;
