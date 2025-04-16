import React, { FC, ButtonHTMLAttributes } from "react";
import styles from "./Button.module.scss";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "confirm" | "cancel"; // 버튼 스타일 종류
  size?: "sm" | "md" | "lg" | "long"; // 버튼 크기
};

const Button: FC<ButtonProps> = ({
  variant = "confirm", // 기본값 primary
  size,
  children, // 버튼 텍스트
  ...props // 나머지 props ex) onClick등
}) => {
  return (
    <button
      className={`${styles.button} ${styles[variant]} ${
        styles["button_" + size]
      }`}
      {...props} // 나머지 props 전달
    >
      {children}
    </button>
  );
};

export default Button;