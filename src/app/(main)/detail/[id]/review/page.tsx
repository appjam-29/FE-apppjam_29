"use client";

import { useState } from "react";
import { GlyphIcon, Icon, Typo, Weight } from "@tapie-kr/inspire-react";
import * as s from "./style.css";

export default function ReviewPage() {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  return (
    <div className={s.container}>
      <Typo.Moderate weight={Weight.BOLD} className={s.placeName}>
        성수 스타벅스 - 리뷰 작성하기
      </Typo.Moderate>
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
      <select className={s.select}>
        <option value="조용함">조용함 (1dB ~ 10dB)</option>
        <option value="보통">보통 (11dB ~ 30dB)</option>
        <option value="시끄러움">시끄러움 (31dB ~ 50dB)</option>
        <option value="매우 시끄러움">매우 시끄러움 (51dB 이상)</option>
      </select>
      <textarea
        value={review}
        onChange={(e) => {
          setReview(e.target.value);
        }}
        placeholder="후기"
        className={s.textarea}
      />
      <button className={s.writeButton}>작성하기</button>
    </div>
  );
}
