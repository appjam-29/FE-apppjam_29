import * as s from './page.css';

import Logo from '@/components/Logo';
import LogoLabel from '@/components/Logo/Label';
import {
  colorVars,
  spacingVars,
  Typo,
  VStack,
  Weight,
} from '@tapie-kr/inspire-react';

export default function AuthPage() {
  return (
    <VStack fullWidth fullHeight className={s.base}>
      <VStack spacing={spacingVars.base} className={s.logoContainer}>
        <Logo size={120} />
        <VStack spacing={spacingVars.micro}>
          <LogoLabel width={84} />
          <Typo.Petite weight={Weight.MEDIUM} color={colorVars.content.default}>
            Chill한 공간을 찾아보세요
          </Typo.Petite>
        </VStack>
      </VStack>
    </VStack>
  );
}
