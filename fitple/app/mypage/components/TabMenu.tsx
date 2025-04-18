'use client';

import styles from "./TabMenu.module.scss";
import Link from "next/link";
import { usePathname } from "next/navigation";

type LinkItem = {
    href: string;
    label: string;
    exact?: boolean;
};

const TabMenu = () => {
    const pathname: string = usePathname();

    const links: LinkItem[] = [
        { href: "/mypage", label: "내 정보", exact: true },
        { href: "/mypage/edit", label: "내 정보", exact: true },
        { href: "/mypage/likelist", label: "찜한 항목" },
        { href: "/mypage/mypost", label: "내 활동" },
        { href: "/mypage/request", label: "요청 목록" },
        { href: "/mypage/team", label: "팀 프로젝트" },
    ];

    const isActive = (href: string, exact: boolean = false): boolean => {
        if (exact) return pathname === href;
        return pathname.startsWith(href);
    };

    return (
        <div className={styles.tabMenuContainer}>
            {links.map((link: LinkItem) => (
                <Link
                    key={link.href}
                    href={link.href}
                    className={`${styles.styledLink} ${isActive(link.href, link.exact) ? styles.active : ''}`}
                >
                    {link.label}
                </Link>
            ))}
        </div>
    );
};

export default TabMenu;