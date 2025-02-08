import { VStack } from "@tapie-kr/inspire-react";

export default function RecommendLayouts({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <VStack fullWidth fullHeight>
      {children}
    </VStack>
  );
}
