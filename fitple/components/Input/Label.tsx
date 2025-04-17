import { HTMLAttributes, ReactNode } from 'react';
import styles from './Label.module.scss';

interface Props extends HTMLAttributes<HTMLDivElement> {
    label?: ReactNode;
    children: ReactNode;
    bottomText?: string;
    direction?: 'row' | 'column';
}

const Label: React.FC<Props> = (props) => {
    const { label, children, bottomText, direction = 'column' } = props;

    return (
        <div className={`${styles.layout}`}>
            <div className={styles[direction]}>
                <label className={styles.label}>{label}</label>
                {children}
            </div>
            {bottomText != null ? <p className={styles.hasError}>{bottomText}</p> : null}
        </div>
    );
};

export default Label;
