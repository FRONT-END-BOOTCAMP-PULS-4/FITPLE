import { HTMLAttributes, ReactNode } from 'react';
import styles from './Label.module.scss';

interface Props extends HTMLAttributes<HTMLDivElement> {
    label?: ReactNode;
    children: ReactNode;
    bottomText?: string;
    direction?: 'row' | 'column';
    hasError?: boolean;
}

const Label: React.FC<Props> = (props) => {
    const { label, children, bottomText, direction = 'column', hasError } = props;

    return (
        <div className={`${styles.layout}`}>
            <div className={styles[direction]}>
                <label className={styles.label}>{label}</label>
                {children}
            </div>
            {hasError && bottomText ? <p className={styles.hasError}>{bottomText}</p> : null}
        </div>
    );
};

export default Label;
