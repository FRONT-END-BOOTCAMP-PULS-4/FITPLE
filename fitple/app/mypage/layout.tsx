import SubTabMenu from './components/SubTabMenu';
import TabMenu from './components/TabMenu';

export default function MyPageLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
    <>
        <TabMenu />
        <SubTabMenu />
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{children}</div>
    </>
    );
}
