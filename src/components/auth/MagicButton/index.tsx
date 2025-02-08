'use client';

import * as s from './styles.css';

import { BrandIcon, Button, GlyphIcon, HStack } from '@tapie-kr/inspire-react';
import { usePathname, useRouter } from 'next/navigation';

type PathMapType = {
  [key: string]: {
    leadingIcon?: BrandIcon;
    label: string;
    trailingIcon?: GlyphIcon;
    action?: () => void;
  };
};

export default function MagicButton() {
  const currentPath = usePathname();
  const router = useRouter();

  const pathMap: PathMapType = {
    '/login': {
      leadingIcon: BrandIcon.GOOGLE,
      label: 'Google로 로그인',
      action: () => {
        router.push('/signup/purpose');
      },
    },
    '/signup/purpose': {
      label: '다음으로',
      action: () => {
        router.push('/signup/situation');
      },
    },
    '/signup/situation': {
      label: '시작하기',
      trailingIcon: GlyphIcon.ARROW_FORWARD,
      action: () => {
        console.log('Signup complete');
      },
    },
  };

  const manifest = pathMap[currentPath];

  return (
    <HStack fullWidth className={s.button}>
      <Button.Default
        fullWidth
        onClick={manifest.action}
        leadingIcon={manifest.leadingIcon}
        trailingIcon={manifest.trailingIcon}>
        {manifest.label}
      </Button.Default>
    </HStack>
  );
}
