import React, { FC, ButtonHTMLAttributes } from "react";
import styles from "./LoginButton.module.scss";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "google" | "kakao"; // 버튼 스타일 종류
  children?: React.ReactNode; // 버튼에 들어갈 내용
};

const LoginButton: FC<ButtonProps> = ({
  variant = "google",
  children,
  ...props
}) => {
  const iconSrc =
    variant === "google"
      ? "https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
      : "https://upload.wikimedia.org/wikipedia/commons/e/e3/KakaoTalk_logo.svg";

  return (
    <button className={`${styles.loginButton} ${styles[variant]}`} {...props}>
      <img src={iconSrc} className={styles.icon} />
      <div>{children}</div>
    </button>
  );
};

export default LoginButton;
