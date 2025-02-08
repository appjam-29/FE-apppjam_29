"use client";

<<<<<<< HEAD
import BottomSheet from "@/components/BottomSheet";
import KakaoMap from "@/components/KakaoMap";
import PlaceCategory from "@/components/PlaceCategory";
import { useMagic, Mode } from "@/stores/useMagic"; // Mode를 useMagic에서 가져오도록 변경
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
} from "@tapie-kr/inspire-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import * as s from "./style.css";
import Link from "next/link";

export default function Home() {
  const router = useRouter();
  const { mode, setMode } = useMagic((state) => state);

  const [recommendState, useRecommendState] = useState<string | null>("Asd");

  const onChangeRecommend = (type: string) => {
    useRecommendState(type);
  };

  const purposes: { id: Mode; icon: IconName; text: string }[] = [
    { id: "work", icon: GlyphIcon.DESCRIPTION, text: "작업" },
    { id: "rest", icon: GlyphIcon.SCHEDULE, text: "휴식" },
    { id: "change-ambiance", icon: GlyphIcon.SYNC, text: "분위기 전환" },
  ];
=======
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
>>>>>>> 95bdb66138c17886e3cc05399f481a622788f6fc

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/login");
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

  const data = [
    {
      id: "13062009",
      place_name: "이디야커피 성수아카데미점",
      start_time: "09:00",
      end_time: "17:00",
      score: 5,
      noise: "무소음",
    },
    {
      id: "13062009",
      place_name: "이디야커피 성수아카데미점",
      start_time: "09:00",
      end_time: "17:00",
      score: 5,
      noise: "무소음",
    },
  ];

  return (
    <VStack fullWidth fullHeight>
<<<<<<< HEAD
      <KakaoMap center={{ lat: 37.5665, lng: 126.978 }} />
      <BottomSheet height={500}>
        {recommendState === null ? (
          <>
            <HStack fullWidth>
              <PlaceCategory
                label={"작업하기 좋은 카페"}
                count={18}
                onClick={() => onChangeRecommend("CAFE")}
              />
              <PlaceCategory
                label={"자연과 만나는 수목원"}
                count={18}
                onClick={() => onChangeRecommend("arboretum")}
              />
            </HStack>
            <div className={s.content}>
              <div className={s.purposes}>
                {purposes.map((purpose) => (
                  <div
                    key={purpose.id}
                    className={`${s.purpose} ${
                      mode === purpose.id ? s.purposeSelected : ""
                    }`}
                    onClick={() => setMode(purpose.id)}
                  >
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
            {data.map((item, idx) => (
              <Link href={`/detail/${item.id}`} key={item.place_name + idx}>
                <HStack
                  fullWidth
                  justify={StackJustify.BETWEEN}
                  className={s.item}
                >
                  <VStack>
                    <HStack fullWidth spacing={8}>
                      <Typo.Moderate weight={Weight.BOLD}>
                        {item.place_name}
                      </Typo.Moderate>
                      <Badge.Default
                        size={BadgeSize.SMALL}
                        label={item.noise}
                      />
                    </HStack>
                    <HStack fullWidth spacing={8} className={s.flexStart}>
                      <Typo.Tiny>
                        {item.start_time} ~ {item.end_time}
                      </Typo.Tiny>
                      <HStack>
                        <Icon name={GlyphIcon.STAR} />
                        <Typo.Tiny>{item.score}</Typo.Tiny>
                      </HStack>
                    </HStack>
                  </VStack>
                  <img
                    src="https://placehold.co/60x60"
                    alt=""
                    className={s.img}
                  />
                </HStack>
              </Link>
            ))}
          </>
        )}
=======
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
>>>>>>> 95bdb66138c17886e3cc05399f481a622788f6fc
      </BottomSheet>
    </VStack>
  );
}
