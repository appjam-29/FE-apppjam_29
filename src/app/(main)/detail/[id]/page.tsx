"use client";

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
import * as s from "./style.css";
import Comment from "@/components/Comment";
import KakaoMap from "@/components/KakaoMap";
import { useParams, useRouter } from "next/navigation";

export default function DetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const data = {
    address_name: "서울 성동구 성수동2가 277-17",
    id: "13062009",
    place_name: "이디야커피 성수아카데미점",
    start_time: "09:00",
    end_time: "17:00",
    score: 5,
    noise: "무소음",
    distance: "150",
    lat: 37.5665,
    lng: 126.978,
    review: [
      {
        nickname: "안예성이닷",
        user_img: "https://placehold.co/1000x1000",
        date: "25.02.08.토",
        score: 3,
        comment:
          "사장님이 너무 chill절하세요 사장님이 너무 chill절하세요 사장님이 너무 chill절하세요 사장님이 너무 chill절하세요 사장님이 너무 chill절하세요 사장님이 너무 chill절하세요 사장님이 너무 chill절하세요 사장님이 너무 chill절하세요",
      },
      {
        nickname: "안예성이닷",
        user_img: "https://placehold.co/1000x1000",
        date: "25.02.08.토",
        score: 5,
        comment:
          "사장님이 너무 chill절하세요 사장님이 너무 chill절하세요 사장님이 너무 chill절하세요 사장님이 너무 chill절하세요 사장님이 너무 chill절하세요 사장님이 너무 chill절하세요 사장님이 너무 chill절하세요 사장님이 너무 chill절하세요",
      },
      {
        nickname: "안예성이닷",
        user_img: "https://placehold.co/1000x1000",
        date: "25.02.08.토",
        score: 5,
        comment:
          "사장님이 너무 chill절하세요 사장님이 너무 chill절하세요 사장님이 너무 chill절하세요 사장님이 너무 chill절하세요 사장님이 너무 chill절하세요 사장님이 너무 chill절하세요 사장님이 너무 chill절하세요 사장님이 너무 chill절하세요",
      },
    ],
  };
  return (
    <VStack fullWidth>
      <img src="https://placehold.co/1000x1000" alt="" className={s.banner} />
      <VStack fullWidth className={s.padding} spacing={16}>
        <HStack fullWidth justify={StackJustify.START} spacing={8}>
          <Typo.Moderate weight={Weight.BOLD}>{data.place_name}</Typo.Moderate>
          <Badge.Default label={data.noise} />
        </HStack>
        <hr className={s.line} />
        <VStack fullWidth align={StackAlign.START} spacing={4}>
          <HStack spacing={8}>
            <Icon name={GlyphIcon.ARROW_FORWARD} />
            <Typo.Micro>{data.address_name}</Typo.Micro>
          </HStack>
          <HStack spacing={8}>
            <Icon name={GlyphIcon.SCHEDULE} />
            <Typo.Micro>
              {data.start_time} ~ {data.end_time}
            </Typo.Micro>
          </HStack>
          <HStack spacing={8}>
            <Icon name={GlyphIcon.FACE} />
            <Typo.Micro>{data.distance}m</Typo.Micro>
          </HStack>
        </VStack>
        <hr className={s.line} />
        <VStack fullWidth align={StackAlign.START} spacing={24}>
          <HStack spacing={8}>
            <Typo.Medium weight={Weight.BOLD}>사용자 리뷰</Typo.Medium>
            <Typo.Base weight={Weight.EXTRABOLD}>
              {data.review.length}
            </Typo.Base>
          </HStack>
          <VStack fullWidth spacing={16}>
            {data.review.map((item, index) => (
              <Comment {...item} key={index} />
            ))}
          </VStack>
          <Button.Default
            className={s.selfCenter}
            onClick={() => {
              router.push(`/detail/${id}/all`);
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
              center={{ lat: data.lat, lng: data.lng }}
              height="320px"
            />
          </VStack>
        </VStack>
      </VStack>
    </VStack>
  );
}
