"use client";

import BottomSheet from "@/components/BottomSheet";
import KakaoMap from "@/components/KakaoMap";
import PlaceCategory from "@/components/PlaceCategory";
import MarkerOverlay from "@/components/MarkerOverlay";
import { api } from "@/api/base";
import { useMagic, Mode } from "@/stores/useMagic"; // Mode를 useMagic에서 가져옴
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

export default function Home() {
  const router = useRouter();
  const { mode, setMode } = useMagic((state) => state);
  const [recommendState, setRecommendState] = useState<string | null>(null);
  const [pos, setPos] = useState({ lat: 37.545085, lng: 127.057695 });
  const [places, setPlaces] = useState<
    { name: string; lat: number; lng: number }[]
  >([]);

  const onChangeRecommend = (type: string) => {
    setRecommendState(type);
  };

  const purposes: { id: Mode; icon: IconName; text: string }[] = [
    { id: "work", icon: GlyphIcon.DESCRIPTION, text: "작업" },
    { id: "rest", icon: GlyphIcon.SCHEDULE, text: "휴식" },
    { id: "change-ambiance", icon: GlyphIcon.SYNC, text: "분위기 전환" },
  ];

  async function getNearbyPlaces(map: any) {
    try {
      const response = await api(true).get(
        `/places/nearby?latitude=${pos.lat}&longitude=${pos.lng}&radius=3&max_results=1000`
      );

      setPlaces(
        response.data.data.places.map((place: any) => ({
          name: place.name,
          lat: place.latitude,
          lng: place.longitude,
        }))
      );
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

  return (
    <VStack fullWidth fullHeight>
      <KakaoMap
        center={{ lat: pos.lat, lng: pos.lng }}
        onDragEnd={(map) => {
          const latlng = map.getCenter();
          setPos({ lat: latlng.getLat(), lng: latlng.getLng() });
          getNearbyPlaces(map);
        }}
        onZoomChanged={(map) => {
          getNearbyPlaces(map);
        }}
      >
        <ZoomControl />
        {places.map((place, index) => (
          <MarkerOverlay
            key={index}
            position={{ lat: place.lat, lng: place.lng }}
          />
        ))}
      </KakaoMap>

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
            {places.map((item, idx) => (
              <Link href={`/detail/${item.name}`} key={idx}>
                <HStack
                  fullWidth
                  justify={StackJustify.BETWEEN}
                  className={s.item}
                >
                  <VStack>
                    <HStack fullWidth spacing={8}>
                      <Typo.Moderate weight={Weight.BOLD}>
                        {item.name}
                      </Typo.Moderate>
                    </HStack>
                  </VStack>
                </HStack>
              </Link>
            ))}
          </>
        )}
      </BottomSheet>
    </VStack>
  );
}
