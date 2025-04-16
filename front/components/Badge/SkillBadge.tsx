import styles from './SkillBadge.module.scss';
import Image from 'next/image';

type Props = {
    type?: 'icon' | 'label';
    name: string;
    label?: string;
};

const SkillBadge = (props: Props) => {
    const { type = 'label', name, label, ...rest } = props;

    return type === 'icon' ? (
        <Image src={`/images/${name}.svg`} width={30} height={30} alt={name} className={styles.skillLogo} {...rest} />
    ) : (
        <div className={styles.label} {...rest}>
            <Image src={`/images/${name}.svg`} width={45} height={45} alt={name} className={styles.skillLogo} />
            <div>{label ? label : name}</div>
        </div>
    );
};

export default SkillBadge;
