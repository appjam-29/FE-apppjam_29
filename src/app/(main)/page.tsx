'use client';

import { api } from '@/api/base';
import BottomSheet from '@/components/BottomSheet';
import KakaoMap from '@/components/KakaoMap';
import MarkerOverlay from '@/components/MarkerOverlay';
import PlaceCategory from '@/components/PlaceCategory';
import { HStack, VStack } from '@tapie-kr/inspire-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ZoomControl } from 'react-kakao-maps-sdk';

export default function Home() {
  const router = useRouter();
  const [pos, setPos] = useState({ lat: 37.545085, lng: 127.057695 });
  const [places, setPlaces] = useState([]);

  async function getNearybyPlaces(map: any) {
    const response = await api(true).get(
      `/places/nearby?latitude=${pos.lat}&longitude=${pos.lng}&radius=3&max_results=1000`,
    );

    setPlaces(
      response.data.data.places.map((place: any) => {
        return {
          name: place.name,
          lat: place.latitude,
          lng: place.longitude,
        };
      }),
    );
  }

  useEffect(() => {
    console.log(places);
  }, [places]);

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      router.push('/login');
    }

    api(true)
      .get(
        `/places/nearby?latitude=${pos.lat}&longitude=${pos.lng}&radius=0.5&max_result=1000`,
      )
      .then((response) => {
        setPlaces(
          response.data.data.places.map((place: any) => {
            return {
              name: place.name,
              lat: place.latitude,
              lng: place.longitude,
            };
          }),
        );
      });
  }, []);

  return (
    <VStack fullWidth fullHeight>
      <KakaoMap
        center={{ lat: pos.lat, lng: pos.lng }}
        onDragEnd={(map) => {
          // 지도 드래그가 끝났을 때 호출되는 함수
          const latlng = map.getCenter();

          setPos({ lat: latlng.getLat(), lng: latlng.getLng() });

          getNearybyPlaces(map);
        }}
        onZoomChanged={(map) => {
          getNearybyPlaces(map);
        }}>
        <ZoomControl />
        {places.map((place: any, index) => (
          <MarkerOverlay
            key={index}
            position={{ lat: place.lat, lng: place.lng }}
          />
        ))}
      </KakaoMap>
      <BottomSheet height={300}>
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
