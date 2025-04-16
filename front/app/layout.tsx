import { DeviceLayoutProvider } from '@/providers/DeviceLayoutProvider';
import './globals.scss';
import './reset.css';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ko">
            <body>
                <DeviceLayoutProvider>{children}</DeviceLayoutProvider>
            </body>
        </html>
    );
}
