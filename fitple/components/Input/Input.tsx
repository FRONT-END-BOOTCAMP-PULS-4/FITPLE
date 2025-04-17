import { InputHTMLAttributes, ReactElement } from 'react';
import styles from './Input.module.scss';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    hasError?: boolean;
    renderRight?: ReactElement;
    variant?: 'outlined' | 'filled';
}

const Input: React.FC<Props> = (props) => {
    const { hasError, renderRight, variant = 'filled', ...rest } = props;

    return (
        <div className={styles.layout}>
            <input className={`${styles.input} ${styles[variant]} ${hasError ? styles.error : ''}`} {...rest} />
            {renderRight ? <div className={styles.btn}>{renderRight}</div> : null}
        </div>
    );
};

export default Input;
