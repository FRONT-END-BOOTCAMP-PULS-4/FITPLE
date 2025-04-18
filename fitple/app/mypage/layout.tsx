import TabMenu from './components/TabMenu';

export default function MyPageLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ko">
            <body>
                <TabMenu />
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>{children}</div>
            </body>
        </html>
    );
}
