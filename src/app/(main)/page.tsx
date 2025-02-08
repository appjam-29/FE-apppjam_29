'use client';

import BottomSheet from '@/components/BottomSheet';
import KakaoMap from '@/components/KakaoMap';
import PlaceCategory from '@/components/PlaceCategory';
import { HStack, VStack } from '@tapie-kr/inspire-react';
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
      <KakaoMap center={{ lat: 37.5665, lng: 126.978 }} />
      <BottomSheet height={500}>
        <HStack fullWidth>
          <PlaceCategory
            label={'작업하기 좋은 카페'}
            count={18}
            href={'/recommend/cafe'}
          />
          <PlaceCategory
            label={'자연과 만나는 수목원'}
            count={18}
            href={'/recommend/arboretum'}
          />
        </HStack>
      </BottomSheet>
    </VStack>
  );
}
