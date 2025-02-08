'use client';

import BottomSheet from '@/components/BottomSheet';
import KakaoMap from '@/components/KakaoMap';
import { VStack } from '@tapie-kr/inspire-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      router.push('/login');
    }
  }, []);

  return (
    <VStack fullWidth fullHeight>
      <KakaoMap />
      <BottomSheet>Test</BottomSheet>
    </VStack>
  );
}
