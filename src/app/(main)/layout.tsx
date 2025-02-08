import BottomBar from '@/components/BottomBar';
import { Box, VStack } from '@tapie-kr/inspire-react';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <VStack fullWidth fullHeight>
      <Box fullWidth fullHeight>
        {children}
      </Box>
      <BottomBar />
    </VStack>
  );
}
