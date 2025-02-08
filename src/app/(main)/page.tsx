"use client";

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

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/login");
    }
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
      </BottomSheet>
    </VStack>
  );
}
