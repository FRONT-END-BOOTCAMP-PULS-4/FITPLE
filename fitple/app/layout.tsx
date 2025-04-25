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
                <DeviceLayoutProvider>
                    <DefaultLayout>{children}</DefaultLayout>
                </DeviceLayoutProvider>
    );
}
