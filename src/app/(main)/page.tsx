'use client';

import { api } from '@/api/base';
import BottomSheet from '@/components/BottomSheet';
import KakaoMap from '@/components/KakaoMap';
import MarkerOverlay from '@/components/MarkerOverlay';
import { Mode, useMagic } from '@/stores/useMagic';
import {
  Badge,
  BadgeSize,
  GlyphIcon,
  HStack,
  Icon,
  IconName,
  StackAlign,
  StackJustify,
  Typo,
  VStack,
  Weight,
} from '@tapie-kr/inspire-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ZoomControl } from 'react-kakao-maps-sdk';
import * as s from './style.css';

type todayLabel = 'sun' | 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat';
function getTodayLabel() {
  const week: todayLabel[] = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  const today = new Date().getDay();
  const todayLabel = week[today];
  return todayLabel;
}

import Dropdown from '@/components/Dropdown';
import PlaceCategory from '@/components/PlaceCategory';
type TSoundLevel = 'quiet' | 'calm' | 'white' | 'noisy' | 'unknown';
const soundLeveltoString: Record<TSoundLevel, string> = {
  quiet: '무소음',
  calm: '잔잔한',
  white: '백색소음',
  noisy: '시끄러운',
  unknown: '선택 안함',
};
interface PlaceType {
  id: string;
  latitude: number;
  longitude: number;
  distance: number;
  name: string;
  opening_hours: {
    [key in todayLabel]?: string;
  };
  preview_image: {
    photos: string[];
    thumbnail: string;
  };
  tags: Record<string, string>; // 빈 객체이므로 임의의 키-값을 받을 수 있도록 설정
  summary: string;
  sound_level: TSoundLevel;
  rating_score: number;
  address: string;
}
const filterType: ('rating_score' | 'mode')[] = ['rating_score', 'mode'];

export default function Home() {
  const router = useRouter();
  const { mode, setMode } = useMagic((state) => state);
  const [pos, setPos] = useState({ lat: 37.545085, lng: 127.057695 });
  const [recommendState, setRecommendState] = useState<string | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<PlaceType | null>(null);
  const [places, setPlaces] = useState<PlaceType[]>([]);
  const [filter, setFilter] = useState<{
    rating_score: string;
    mode: string;
  }>({
    rating_score: '',
    mode: '',
  });
  const onChangeRecommend = (type: string) => {
    setRecommendState(type);
  };

  const purposes: { id: Mode; icon: IconName; text: string }[] = [
    { id: 'work', icon: GlyphIcon.DESCRIPTION, text: '작업' },
    { id: 'rest', icon: GlyphIcon.SCHEDULE, text: '휴식' },
    { id: 'change-ambiance', icon: GlyphIcon.SYNC, text: '분위기 전환' },
  ];
  const dayOfWeek = getTodayLabel() || 'sat';

  async function getNearbyPlaces(map: any) {
    try {
      const response = await api(true).get(
        `/places/nearby?latitude=${pos.lat}&longitude=${pos.lng}&radius=3&max_results=1000`,
      );

      setPlaces(response.data.data.places.map((place: any) => ({ ...place })));
    } catch (error) {
      console.error('Error fetching places:', error);
    }
  }

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      router.push('/login');
    }
    getNearbyPlaces(null);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <VStack fullWidth fullHeight>
      {recommendState !== null && (
        <HStack
          fullWidth
          className={s.filterContainer}
          justify={StackJustify.START}
          spacing={4}>
          {filterType.map((item) => (
            <Dropdown
              handleChange={handleChange}
              type={item}
              selectedValue={filter[item]}
              key={'dropdwon' + item}
            />
          ))}
        </HStack>
      )}
      <KakaoMap
        center={{ lat: pos.lat, lng: pos.lng }}
        onDragEnd={(map) => {
          const latlng = map.getCenter();
          setPos({ lat: latlng.getLat(), lng: latlng.getLng() });
          getNearbyPlaces(map);
        }}
        onZoomChanged={getNearbyPlaces}>
        <ZoomControl />
        {places.map((place) => (
          <div key={place.id} onClick={() => setSelectedPlace(place)}>
            <MarkerOverlay
              position={{ lat: place.latitude, lng: place.longitude }}
            />
          </div>
        ))}
      </KakaoMap>

      <BottomSheet height={selectedPlace ? 200 : 500}>
        {selectedPlace ? (
          <Link href={`/detail/${selectedPlace.id}`}>
            <HStack fullWidth justify={StackJustify.BETWEEN} className={s.item}>
              <VStack align={StackAlign.START} spacing={4}>
                <Badge.Default
                  label={soundLeveltoString[selectedPlace.sound_level]}
                />

                <HStack fullWidth spacing={8} justify={StackJustify.START}>
                  <Typo.Moderate weight={Weight.BOLD}>
                    {selectedPlace.name}
                  </Typo.Moderate>
                </HStack>
                <HStack fullWidth spacing={8} className={s.flexStart}>
                  <Typo.Base>
                    {selectedPlace.opening_hours?.[dayOfWeek]}
                  </Typo.Base>
                  <HStack>
                    <Icon name={GlyphIcon.STAR} />
                    <Typo.Base>{selectedPlace.rating_score}</Typo.Base>
                    <Typo.Base>
                      {String(selectedPlace.distance).substring(0, 4)}km
                    </Typo.Base>
                  </HStack>
                </HStack>
                <Typo.Base>{selectedPlace.address}</Typo.Base>
              </VStack>
              <img
                src={selectedPlace.preview_image?.thumbnail}
                alt=''
                className={s.selectedImg}
              />
            </HStack>
          </Link>
        ) : recommendState === null ? (
          <>
            <HStack fullWidth>
              <PlaceCategory
                label={'작업하기 좋은 카페'}
                count={15}
                onClick={() => onChangeRecommend('CAFE')}
              />
              <PlaceCategory
                label={'자연과 만나는 수목원'}
                count={15}
                onClick={() => onChangeRecommend('arboretum')}
              />
            </HStack>
            <div className={s.content}>
              <div className={s.purposes}>
                {purposes.map((purpose) => (
                  <div
                    key={purpose.id}
                    className={`${s.purpose} ${
                      mode === purpose.id ? s.purposeSelected : ''
                    }`}
                    onClick={() => setMode(purpose.id)}>
                    <Icon name={purpose.icon} />
                    <Typo.Petite>{purpose.text}</Typo.Petite>
                  </div>
                ))}
              </div>
              <Typo.Petite className={s.latestOrPlace}>
                최근 뜨는 장소
              </Typo.Petite>
            </div>
          </>
        ) : (
          <>
            <Icon
              name={GlyphIcon.CLOSE}
              onClick={() => {
                setRecommendState(null);
              }}
            />
            {places.map((item) => (
              <Link href={`/detail/${item.id}`} key={item.id}>
                <HStack
                  fullWidth
                  justify={StackJustify.BETWEEN}
                  className={s.item}
                  onClick={() => setSelectedPlace(item)}>
                  <VStack>
                    <HStack fullWidth spacing={8}>
                      <Typo.Moderate weight={Weight.BOLD}>
                        {item.name}
                      </Typo.Moderate>
                      <Badge.Default
                        size={BadgeSize.SMALL}
                        label={item.sound_level}
                      />
                    </HStack>
                    <HStack fullWidth spacing={8} className={s.flexStart}>
                      <Typo.Tiny>{item.summary}</Typo.Tiny>
                      <HStack>
                        <Icon name={GlyphIcon.STAR} />
                        <Typo.Tiny>{item.rating_score}</Typo.Tiny>
                      </HStack>
                    </HStack>
                  </VStack>
                  <img
                    src={item.preview_image?.thumbnail}
                    alt=''
                    className={s.img}
                  />
                </HStack>
              </Link>
            ))}
          </>
        )}
      </BottomSheet>
    </VStack>
  );
}
