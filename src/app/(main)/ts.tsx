"use client";

import BottomSheet from "@/components/BottomSheet";
import KakaoMap from "@/components/KakaoMap";
import MarkerOverlay from "@/components/MarkerOverlay";
import { api } from "@/api/base";
import { useMagic, Mode } from "@/stores/useMagic";
import {
  Badge,
  BadgeSize,
  GlyphIcon,
  HStack,
  Icon,
  IconName,
  StackJustify,
  Typo,
  VStack,
  Weight,
} from "@tapie-kr/inspire-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import * as s from "./style.css";
import Link from "next/link";
import { ZoomControl } from "react-kakao-maps-sdk";
import PlaceCategory from "@/components/PlaceCategory";

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
  sound_level: string;
  rating_score: number;
  address: string;
}

type todayLabel =
  | "sunday"
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday";
function getTodayLabel(): todayLabel {
  const week: todayLabel[] = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  return week[new Date().getDay()];
}

export default function Home() {
  const router = useRouter();
  const { mode, setMode } = useMagic((state) => state);
  const [pos, setPos] = useState({ lat: 37.545085, lng: 127.057695 });
  const [recommendState, setRecommendState] = useState<string | null>(null);
  const [places, setPlaces] = useState<PlaceType[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<PlaceType | null>(null);
  const dayOfWeek = getTodayLabel();

  async function getNearbyPlaces(map: any) {
    try {
      const response = await api(true).get(
        `/places/nearby?latitude=${pos.lat}&longitude=${pos.lng}&radius=3&max_results=1000`
      );
      setPlaces(response.data.data.places);
    } catch (error) {
      console.error("Error fetching places:", error);
    }
  }

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/login");
    }
    getNearbyPlaces(null);
  }, []);

  const onChangeRecommend = (type: string) => {
    setRecommendState(type);
  };

  const purposes: { id: Mode; icon: IconName; text: string }[] = [
    { id: "work", icon: GlyphIcon.DESCRIPTION, text: "작업" },
    { id: "rest", icon: GlyphIcon.SCHEDULE, text: "휴식" },
    { id: "change-ambiance", icon: GlyphIcon.SYNC, text: "분위기 전환" },
  ];

  return (
    <VStack fullWidth fullHeight>
      <KakaoMap
        center={{ lat: pos.lat, lng: pos.lng }}
        onDragEnd={(map) => {
          const latlng = map.getCenter();
          setPos({ lat: latlng.getLat(), lng: latlng.getLng() });
          getNearbyPlaces(map);
        }}
        onZoomChanged={getNearbyPlaces}
      >
        <ZoomControl />
        {places.map((place) => (
          <div key={place.id} onClick={() => setSelectedPlace(place)}>
            <MarkerOverlay
              position={{ lat: place.latitude, lng: place.longitude }}
            />
          </div>
        ))}
      </KakaoMap>

      <BottomSheet height={500}>
        {selectedPlace ? (
          <HStack fullWidth justify={StackJustify.BETWEEN} className={s.item}>
            <VStack>
              <HStack fullWidth spacing={8}>
                <Typo.Moderate weight={Weight.BOLD}>
                  {selectedPlace.name}
                </Typo.Moderate>
                <Badge.Default
                  size={BadgeSize.SMALL}
                  label={selectedPlace.sound_level}
                />
              </HStack>
              <HStack fullWidth spacing={8} className={s.flexStart}>
                <Typo.Tiny>
                  {selectedPlace.opening_hours?.[dayOfWeek]}
                </Typo.Tiny>
                <HStack>
                  <Icon name={GlyphIcon.STAR} />
                  <Typo.Tiny>{selectedPlace.rating_score}</Typo.Tiny>
                </HStack>
              </HStack>

              <div style={{ display: "flex" }}>
                <Typo.Mini>
                  {String(selectedPlace.distance).substring(0, 4)}km
                </Typo.Mini>
                · <Typo.Mini>{selectedPlace.address}</Typo.Mini>
              </div>
            </VStack>
            <img
              src={selectedPlace.preview_image?.thumbnail}
              alt=""
              className={s.img}
            />
          </HStack>
        ) : recommendState === null ? (
          <>
            <HStack fullWidth>
              <PlaceCategory
                label={"작업하기 좋은 카페"}
                count={15}
                onClick={() => onChangeRecommend("CAFE")}
              />
              <PlaceCategory
                label={"자연과 만나는 수목원"}
                count={15}
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
              <Typo.Petite className={s.latestPlace}>
                최근 뜨는 장소
              </Typo.Petite>
            </div>
          </>
        ) : (
          <>
            {places.map((item) => (
              <Link href={`/detail/${item.id}`} key={item.id}>
                <HStack
                  fullWidth
                  justify={StackJustify.BETWEEN}
                  className={s.item}
                  onClick={() => setSelectedPlace(item)}
                >
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
                      <Typo.Tiny>{item.opening_hours?.[dayOfWeek]}</Typo.Tiny>
                      <HStack>
                        <Icon name={GlyphIcon.STAR} />
                        <Typo.Tiny>{item.rating_score}</Typo.Tiny>
                      </HStack>
                    </HStack>
                  </VStack>
                  <img
                    src={item.preview_image?.thumbnail}
                    alt=""
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
