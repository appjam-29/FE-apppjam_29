"use client";

import { api } from "@/api/base";
import Comment, { CommentProps } from "@/components/Comment";
import KakaoMap from "@/components/KakaoMap";
import {
  Badge,
  Button,
  GlyphIcon,
  HStack,
  Icon,
  StackAlign,
  StackJustify,
  Typo,
  VStack,
  Weight,
} from "@tapie-kr/inspire-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { soundLeveltoString, TSoundLevel } from "../../page";
import * as s from "./style.css";

interface PlaceType {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  map_id: string;
  address: string;
  rating_score: number;
  opening_hours: {
    monday?: string;
    tuesday?: string;
    wednesday?: string;
    thursday?: string;
    friday?: string;
    saturday?: string;
    sunday?: string;
  };
  preview_image: {
    photos: string[];
  };
  tags: Record<string, string>;
  summary: string;
  sound_level: TSoundLevel;
}

interface ReviewType {
  nickname: string;
  user_img: string;
  date: string;
  score: number;
  comment: string;
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

export default function DetailPage() {
  const router = useRouter();
  const params = useParams();
  const placeId = params.id as string;

  const [placeData, setPlaceData] = useState<PlaceType | null>(null);
  const [reviews, setReviews] = useState<CommentProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const dayOfWeek = getTodayLabel();
  const [pos] = useState({ lat: 37.545085, lng: 127.057695 });

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const placeResponse = await api(true).get(`/places/${placeId}`, {
          params: {
            latitude: pos.lat,
            longitude: pos.lng,
          },
        });
        setPlaceData(placeResponse.data.data as PlaceType);

        const reviewsResponse = await api(true).get(
          `/places/${placeId}/reviews`
        );
        setReviews(reviewsResponse.data.data.reviews as CommentProps[]);
      } catch (error) {
        console.error("Error fetching place details:", error);
      } finally {
        setIsLoading(false);
      }
    }

    if (placeId) {
      fetchData();
    }
  }, [placeId]);

  if (isLoading) {
    return <Typo.Base>로딩 중...</Typo.Base>;
  }

  if (!placeData) {
    return <Typo.Base>데이터를 불러올 수 없습니다.</Typo.Base>;
  }

  return (
    <VStack fullWidth>
      <img
        src={
          placeData.preview_image.photos[0] || "https://placehold.co/1000x1000"
        }
        alt=""
        className={s.banner}
      />
      <VStack fullWidth className={s.padding} spacing={16}>
        <HStack fullWidth justify={StackJustify.START} spacing={8}>
          <Typo.Moderate weight={Weight.BOLD}>{placeData.name}</Typo.Moderate>
          <Badge.Default
            label={soundLeveltoString[placeData.sound_level] ?? ""}
          />
        </HStack>
        <hr className={s.line} />
        <VStack fullWidth align={StackAlign.START} spacing={4}>
          <HStack spacing={8}>
            <Icon name={GlyphIcon.ARROW_FORWARD} />
            <Typo.Micro>{placeData.address}</Typo.Micro>
          </HStack>
          <HStack spacing={8}>
            <Icon name={GlyphIcon.SCHEDULE} />
            <Typo.Micro>{placeData.opening_hours?.[dayOfWeek]}</Typo.Micro>
          </HStack>
        </VStack>
        <hr className={s.line} />
        <VStack fullWidth align={StackAlign.START} spacing={24}>
          <HStack spacing={8}>
            <Typo.Medium weight={Weight.BOLD}>사용자 리뷰</Typo.Medium>
            <Typo.Base weight={Weight.EXTRABOLD}>{reviews.length}</Typo.Base>
          </HStack>
          <VStack fullWidth spacing={16}>
            {reviews.length > 0 ? (
              reviews.map((item, index) => <Comment {...item} key={index} />)
            ) : (
              <Typo.Base>아직 리뷰가 없습니다.</Typo.Base>
            )}
          </VStack>
          <Button.Default
            className={s.selfCenter}
            onClick={() => {
              router.push(`/detail/${placeId}/all`);
            }}
          >
            사용자 리뷰 더보기
          </Button.Default>
        </VStack>
        <hr className={s.line} />
        <VStack fullWidth align={StackAlign.START} spacing={24}>
          <VStack spacing={8} fullWidth align={StackAlign.START}>
            <Typo.Medium weight={Weight.BOLD}>지도</Typo.Medium>
            <KakaoMap
              center={{ lat: placeData.latitude, lng: placeData.longitude }}
              height="320px"
            />
          </VStack>
        </VStack>
      </VStack>
    </VStack>
  );
}
