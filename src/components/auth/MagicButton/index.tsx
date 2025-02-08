'use client';

import { useLogin } from '@/hooks/useLogin';
import * as s from './styles.css';

import { api } from '@/api/base';
import { useMagic } from '@/stores/useMagic';
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

  const { mode, sound } = useMagic((state) => state);

  const googleAction = useLogin(() => {
    router.push('/signup/purpose');
  });

  const pathMap: PathMapType = {
    '/login': {
      leadingIcon: BrandIcon.GOOGLE,
      label: 'Google로 로그인',
      action: () => {
        googleAction();
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
        api(true).post('/member/update-personalized-data', {
          mode,
          sound,
        });
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
