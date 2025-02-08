import { Box, StackJustify, VStack } from "@tapie-kr/inspire-react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <VStack fullWidth fullHeight justify={StackJustify.START}>
      <Box
        fullWidth
        // fullHeight
        style={{ overflowY: "scroll", height: "calc(100% - 64px)" }}
      >
        {children}
      </Box>
      {/* <BottomBar /> */}
    </VStack>
  );
}
