'use client';

import { usePathname, useRouter } from 'next/navigation';
import * as s from './styles.css';

import {
  colorVars,
  GlyphIcon,
  HStack,
  Icon,
  IconName,
  spacingVars,
  Typo,
  VStack,
  Weight,
} from '@tapie-kr/inspire-react';

export default function BottomBar() {
  return (
    <HStack fullWidth spacing={spacingVars.micro} className={s.base}>
      <BottomBarItem href={'/'} leadingIcon={GlyphIcon.HOME} label='홈' />
      <BottomBarItem
        href={'/explore'}
        leadingIcon={GlyphIcon.EXPLORE}
        label='탐색'
      />
      <BottomBarItem
        href={'/profile'}
        leadingIcon={GlyphIcon.FACE}
        label='내 정보'
      />
    </HStack>
  );
}

interface BottomBarItemProps {
  leadingIcon: IconName;
  href: string;
  label: string;
}

function BottomBarItem(props: BottomBarItemProps) {
  const { leadingIcon, label, href } = props;

  const router = useRouter();
  const currentPath = usePathname();

  const focused = currentPath.startsWith(href);

  const color = focused
    ? colorVars.content.emphasized
    : colorVars.content.muted;

  return (
    <VStack
      spacing={spacingVars.optical}
      fullWidth
      className={s.item}
      onClick={() => {
        router.push(href);
      }}>
      <Icon name={leadingIcon} size={28} color={color} />
      <Typo.Tiny weight={Weight.MEDIUM} color={color}>
        {label}
      </Typo.Tiny>
    </VStack>
  );
}
