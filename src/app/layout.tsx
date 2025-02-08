import { Box } from '@tapie-kr/inspire-react';
import * as s from './layout.css';

import { InspireProvider } from '@tapie-kr/inspire-react/provider';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body className={s.layout}>
        <InspireProvider>
          <Box className={s.base}>{children}</Box>
        </InspireProvider>
      </body>
    </html>
  );
}
