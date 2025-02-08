import { Box } from '@tapie-kr/inspire-react';
import * as s from './layout.css';

import { GoogleOAuthProvider } from '@react-oauth/google';
import { InspireProvider } from '@tapie-kr/inspire-react/provider';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body className={s.layout}>
        <GoogleOAuthProvider
          clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ''}>
          <InspireProvider>
            <Box className={s.base}>{children}</Box>
          </InspireProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
