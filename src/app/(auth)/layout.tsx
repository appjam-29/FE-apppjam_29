import MagicButton from '@/components/auth/MagicButton';
import * as s from './layout.css';

import { VStack } from '@tapie-kr/inspire-react';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <VStack fullWidth fullHeight className={s.base}>
      {children}
      <MagicButton />
    </VStack>
  );
}
