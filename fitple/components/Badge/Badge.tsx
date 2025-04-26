import styles from "./Badge.module.scss";
import { CSSProperties, HTMLAttributes, ReactNode } from "react";

interface Props extends HTMLAttributes<HTMLSpanElement> {
    children: ReactNode;
    size?: "sm" | "md";
    backgroundColor?: CSSProperties["backgroundColor"];
    variant?: "outlined" | "filled";
}
const roleColors: Record<string, string> = {
    FE: "#4A90E2",
    BE: "#2C3E50",
    DI: "#E94E77",
    PM: "#27AE60",
    FS: "#F39C12",
};

const Badge = (props: Props) => {
    const { children, size = "md", backgroundColor, variant = "filled", role } = props;
    const roleColor = role ? roleColors[role] : backgroundColor;

    return (
        <span
            className={`${styles.badge} ${styles[size]} ${styles[variant]}`}
            style={{ backgroundColor: roleColor, ...props }}
        >
            {children}
        </span>
    );
};

export default Badge;
