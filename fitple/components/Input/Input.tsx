import { InputHTMLAttributes, ReactElement } from 'react';
import styles from './Input.module.scss';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    hasError?: boolean;
    renderRight?: ReactElement;
    variant?: 'outlined' | 'filled' | 'underline';
    inputClassName?: string;
}

const Input: React.FC<Props> = (props) => {
    const { hasError, renderRight, variant = 'filled', inputClassName, ...rest } = props;

    return (
        <div className={styles.layout}>
            <input
                className={`${styles.input} ${styles[variant]} ${hasError ? styles.error : ''} ${inputClassName ?? ''}`}
                {...rest}
            />
            {renderRight ? <div className={styles.btn}>{renderRight}</div> : null}
        </div>
    );
};


export default Input;
