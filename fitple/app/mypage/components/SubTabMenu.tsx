"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./SubTabMenu.module.scss";

const subTabs = {
    "/mypage/likelist": [
        { href: "/mypage/likelist/projects", label: "찜한 프로젝트" },
        { href: "/mypage/likelist/profiles", label: "찜한 프로필" },
    ],
    "/mypage/mypost": [
        { href: "/mypage/mypost/projects", label: "작성한 프로젝트" },
        { href: "/mypage/mypost/profiles", label: "작성한 프로필" },
    ],
    "/mypage/request": [
        { href: "/mypage/request/received", label: "받은 요청" },
        { href: "/mypage/request/sent", label: "보낸 요청" },
    ],
};

const SubTabMenu = () => {
    const pathname = usePathname();

    const currentBasePath = Object.keys(subTabs).find((base) => pathname.startsWith(base));
    const currentTabs = currentBasePath ? subTabs[currentBasePath] : [];

    if (!currentTabs.length) return null;

    return (
        <div className={styles.subTabMenu}>
            {currentTabs.map((tab) => (
                <Link
                    key={tab.href}
                    href={tab.href}
                    className={`${styles.subTabLink} ${pathname === tab.href ? styles.active : ""}`}
                >
                    {tab.label}
                </Link>
            ))}
        </div>
    );
};

export default SubTabMenu;
