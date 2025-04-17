import React from "react";
import styles from "./Modal.module.scss";

type ModalProps = {
    children: React.ReactNode;
    onClose: () => void;
};

const Modal = ({ children, onClose }: ModalProps) => {
    return (
        <div className={styles["modalOverlay"]} onClick={onClose}>
            <div
                className={styles["modalContent"]}
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
};

export default Modal;
