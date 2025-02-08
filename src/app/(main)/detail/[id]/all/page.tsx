"use client";

import { GlyphIcon, Icon, Typo, VStack } from "@tapie-kr/inspire-react";
import Comment from "@/components/Comment";
import * as s from "./style.css";
import { useParams, useRouter } from "next/navigation";
import { api } from "@/api/base";
import { useEffect, useState } from "react";

type Treview = {
  author: {
    name: string;
    id: string;
    profile_image: string;
    created_at: string;
  };
  content: string;
  id: string;
  images: string[];
  rating: number;
  sound_level: "quiet" | "calm" | "white" | "noisy" | "unknown";
};

export default function AllReviewPage() {
  const router = useRouter();
  const id = useParams().id;
  const [review, setReview] = useState<Treview[]>([]);

  async function getNearbyPlaces() {
    try {
      const response = await api(true).get(`/places/${id}/reviews`);
      setReview(response.data.data.reviews);
    } catch (error) {
      console.error("Error fetching places:", error);
    }
  }

  useEffect(() => {
    getNearbyPlaces();
  }, []);

  return (
    <div className={s.container}>
      <header className={s.header}>
        <div className={s.left}>
          <Typo.Petite>사용자 리뷰</Typo.Petite>
          <Typo.Micro>{review.length}</Typo.Micro>
        </div>
        <Icon
          name={GlyphIcon.EDIT}
          onClick={() => {
            router.push(`/detail/${id}/review`);
          }}
        />
      </header>
      <VStack fullWidth spacing={16} style={{ padding: "16px 14px" }}>
        {review.map((item, index) => (
          <Comment {...item} elipsis={false} key={index} />
        ))}
      </VStack>
    </div>
  );
}
