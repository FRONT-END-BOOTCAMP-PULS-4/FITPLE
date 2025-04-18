import './globals.scss';
import './reset.css';
import { DeviceLayoutProvider } from '@/providers/DeviceLayoutProvider';
import DefaultLayout from '@/components/Layout/DefaultLayout';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ko">
            <body>
                <DeviceLayoutProvider>
                    <DefaultLayout>{children}</DefaultLayout>
                </DeviceLayoutProvider>
            </body>
        </html>
    );
}
