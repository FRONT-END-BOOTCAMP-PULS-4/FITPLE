'use client';

import styles from './DefaultLayout.module.scss';
import { ReactNode } from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { usePathname } from 'next/navigation';

type DefaultLayoutProps = {
    hideFooter?: boolean;
    hideHeader?: boolean;
    children: ReactNode;
};

const DefaultLayout: React.FC<DefaultLayoutProps> = (props) => {
    const { hideFooter = false, hideHeader = false, children } = props;
    const pathname = usePathname();

    const isLoginPath = pathname?.startsWith('/login');

    const FOOTER_HEIGHT = '223px';
    const HEADER_HEIGHT = '133px';

    return (
        <>
            {!hideHeader && !isLoginPath && <Header />}
            <main
                className={isLoginPath ? styles.loginLayout : ''}
                style={{
                    minHeight: `calc(100vh${!hideHeader ? ` - ${HEADER_HEIGHT}` : 0}${
                        !hideFooter ? ` - ${FOOTER_HEIGHT}` : 0
                    })`,
                }}
            >
                {children}
            </main>
            {!hideFooter && !isLoginPath && <Footer />}
        </>
    );
};

export default DefaultLayout;
