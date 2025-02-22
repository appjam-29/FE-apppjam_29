import * as s from "./style.css";
import {
  Badge,
  BadgeSize,
  GlyphIcon,
  HStack,
  Icon,
  StackAlign,
  Typo,
  VStack,
} from "@tapie-kr/inspire-react";

export interface CommentProps {
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
  elipsis: boolean;
}

const soundLeveltoString = {
  quiet: "무소음",
  calm: "잔잔한",
  white: "백색소음",
  noisy: "시끄러운",
  unknown: "선택 안함",
};

export default function Comment({
  author,
  content,
  id,
  images,
  rating,
  sound_level,
  elipsis = true,
}: CommentProps) {
  return (
    <VStack fullWidth align={StackAlign.START} spacing={4}>
      <HStack spacing={8}>
        <img className={s.profile_img} src={author.profile_image} />
        <Typo.Base>{author.name}</Typo.Base>
        <Typo.Micro>{author.created_at}</Typo.Micro>
      </HStack>
      <HStack>
        {Array.from({ length: rating }).map((_, i) => (
          <Icon
            key={`filled-${i}`}
            name={GlyphIcon.STAR}
            className={s.filledStar}
          />
        ))}
        {Array.from({ length: 5 - rating }).map((_, i) => (
          <Icon key={`empty-${i}`} name={GlyphIcon.STAR} />
        ))}
        <Badge.Default
          size={BadgeSize.SMALL}
          label={soundLeveltoString[sound_level]}
        />
      </HStack>
      <Typo.Base className={elipsis ? s.comment : ""}>{content}</Typo.Base>
    </VStack>
  );
}
