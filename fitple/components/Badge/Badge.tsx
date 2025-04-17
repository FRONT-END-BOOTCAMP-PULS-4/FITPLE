import styles from './Badge.module.scss';
import { CSSProperties, HTMLAttributes, ReactNode } from 'react';

interface Props extends HTMLAttributes<HTMLSpanElement> {
    children: ReactNode;
    size?: 'sm' | 'md';
    backgroundColor?: CSSProperties['backgroundColor'];
    variant?: 'outlined' | 'filled';
}

const Badge = (props: Props) => {
    const { children, size = 'md', backgroundColor, variant = 'filled' } = props;

    return (
        <span className={`${styles.badge} ${styles[size]} ${styles[variant]}`} style={{ backgroundColor }}>
            {children}
        </span>
    );
};

export default Badge;
