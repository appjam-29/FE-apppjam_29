import { InspireProvider } from '@tapie-kr/inspire-react/provider';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>
        <InspireProvider>{children}</InspireProvider>
      </body>
    </html>
  );
}
