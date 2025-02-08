<<<<<<< HEAD
import BottomBar from "@/components/BottomBar";
import { Box, VStack } from "@tapie-kr/inspire-react";

export default function RootLayout({
=======
import { VStack } from '@tapie-kr/inspire-react';

export default function RecommendLayouts({
>>>>>>> 95bdb66138c17886e3cc05399f481a622788f6fc
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <VStack fullWidth fullHeight>
<<<<<<< HEAD
      <Box fullWidth fullHeight>
        {children}
      </Box>
=======
      {children}
>>>>>>> 95bdb66138c17886e3cc05399f481a622788f6fc
    </VStack>
  );
}
