import { ReactNode } from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

type DefaultLayoutProps = {
    hideFooter?: boolean;
    hideHeader?: boolean;
    children: ReactNode;
};

const DefaultLayout: React.FC<DefaultLayoutProps> = (props) => {
    const { hideFooter = false, hideHeader = false, children } = props;

    const FOOTER_HEIGHT = '223px';
    const GNB_HEIGHT = '133px';

    return (
        <>
            {!hideHeader && <Header />}
            <main
                style={{
                    minHeight: `calc(100vh${!hideHeader ? ` - ${GNB_HEIGHT}` : 0}${
                        !hideFooter ? ` - ${FOOTER_HEIGHT}` : 0
                    })`,
                }}
            >
                {children}
            </main>
            {!hideFooter && <Footer />}
        </>
    );
};

export default DefaultLayout;
