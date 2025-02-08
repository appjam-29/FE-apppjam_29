"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { api } from "@/api/base";
import { GlyphIcon, Icon, Typo, Weight } from "@tapie-kr/inspire-react";
import * as s from "./style.css";

export default function ReviewPage() {
  const router = useRouter();
  const params = useParams();
  const placeId = params.id as string;

  const [placeName, setPlaceName] = useState("");

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [soundLevel, setSoundLevel] = useState("quiet");
  const [pos] = useState({ lat: 37.545085, lng: 127.057695 });

  useEffect(() => {
    async function fetchPlaceDetails() {
      try {
        const response = await api(true).get(`/places/${placeId}`, {
          params: {
            latitude: pos.lat,
            longitude: pos.lng,
          },
        });
        console.log(response);
        setPlaceName(response.data.data.name);
      } catch (error) {
        console.error("장소 정보를 불러오는 데 실패했습니다:", error);
        setPlaceName("알 수 없는 장소");
      }
    }

    if (placeId) {
      fetchPlaceDetails();
    }
  }, [placeId]);

  const submitReview = async () => {
    if (!rating || !review.trim()) {
      alert("별점과 후기를 입력해주세요!");
      return;
    }

    try {
      await api(true).post(`/places/${placeId}/reviews`, {
        rating,
        content: review,
        sound_level: soundLevel,
      });

      alert("리뷰가 작성되었습니다!");
      router.push(`/detail/${placeId}`);
    } catch (error) {
      console.error("리뷰 작성 실패:", error);
      alert("리뷰 작성에 실패했습니다.");
    }
  };

  return (
    <div className={s.container}>
      <Typo.Moderate weight={Weight.BOLD}>{placeName}</Typo.Moderate>
      <div className={s.stars}>
        {Array.from({ length: 5 }).map((_, index) => (
          <Icon
            key={index}
            name={GlyphIcon.STAR}
            className={index < rating ? s.filledStar : s.emptyStar}
            onClick={() => setRating(index + 1)}
            size={32}
          />
        ))}
      </div>
      <select
        className={s.select}
        value={soundLevel}
        onChange={(e) => setSoundLevel(e.target.value)}
      >
        <option value="quiet">조용함 (1dB ~ 10dB)</option>
        <option value="moderate">보통 (11dB ~ 30dB)</option>
        <option value="noisy">시끄러움 (31dB ~ 50dB)</option>
      </select>
      <textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="후기"
        className={s.textarea}
      />
      <button className={s.writeButton} onClick={submitReview}>
        작성하기
      </button>
    </div>
  );
}
