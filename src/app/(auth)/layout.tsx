import * as s from './layout.css';

import { Button, HStack, VStack } from '@tapie-kr/inspire-react';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <VStack fullWidth fullHeight className={s.base}>
      {children}
      <HStack fullWidth className={s.button}>
        <Button.Default fullWidth>Google로 로그인</Button.Default>
      </HStack>
    </VStack>
  );
}
