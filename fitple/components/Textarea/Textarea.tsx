import { TextareaHTMLAttributes } from 'react';
import styles from './Textarea.module.scss';

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    size?: 'sm' | 'md';
}

const Textarea: React.FC<Props> = (props) => {
    const { size = 'sm', ...rest } = props;

    return <textarea className={`${styles.textarea} ${styles[size]}`} {...rest} />;
};

export default Textarea;
