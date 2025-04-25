import SubTabMenu from './components/SubTabMenu';
import TabMenu from './components/TabMenu';

export default function MyPageLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
    <div style={{ height: '100%'}}>
        <TabMenu />
        <SubTabMenu />
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{children}</div>
    </div>
    );
}
