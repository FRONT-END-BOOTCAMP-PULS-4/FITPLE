import SubTabMenu from './components/SubTabMenu';
import TabMenu from './components/TabMenu';

export default function MyPageLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <TabMenu />
            <SubTabMenu />
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '60px' }}>
                {children}
            </div>
        </div>
    );
}
