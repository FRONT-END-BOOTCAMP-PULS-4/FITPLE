import './globals.scss';
import './reset.css';
import { DeviceLayoutProvider } from '@/providers/DeviceLayoutProvider';
import DefaultLayout from '@/components/Layout/DefaultLayout';
import { GoogleOAuthProvider } from '@react-oauth/google';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html>
            <body>
                <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
                    <DeviceLayoutProvider>
                        <DefaultLayout>{children}</DefaultLayout>
                    </DeviceLayoutProvider>
                </GoogleOAuthProvider>
            </body>
        </html>
    );
}
