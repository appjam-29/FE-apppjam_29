"use client";

import { GlyphIcon, Icon, Typo, VStack } from "@tapie-kr/inspire-react";
import Comment from "@/components/Comment";
import * as s from "./style.css";
import { useParams, useRouter } from "next/navigation";

export default function AllReviewPage() {
  const router = useRouter();
  const id = useParams().id;
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
    <div className={s.container}>
      <header className={s.header}>
        <div className={s.left}>
          <Typo.Petite>사용자 리뷰</Typo.Petite>
          <Typo.Micro>61</Typo.Micro>
        </div>
        <Icon
          name={GlyphIcon.EDIT}
          onClick={() => {
            router.push(`/detail/${id}/review`);
          }}
        />
      </header>
      <VStack fullWidth spacing={16} style={{ padding: "16px 14px" }}>
        {data.review.map((item, index) => (
          <Comment {...item} elipsis={false} key={index} />
        ))}
      </VStack>
    </div>
  );
}
