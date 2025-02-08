import * as s from "./style.css";
import {
  GlyphIcon,
  HStack,
  Icon,
  StackAlign,
  Typo,
  VStack,
} from "@tapie-kr/inspire-react";

interface Props {
  nickname: string;
  user_img: string;
  date: string;
  score: number;
  comment: string;
  elipsis?: boolean;
}

export default function Comment({
  nickname,
  user_img,
  date,
  score,
  comment,
  elipsis = true,
}: Props) {
  return (
    <VStack fullWidth align={StackAlign.START} spacing={4}>
      <HStack spacing={8}>
        <img className={s.profile_img} src={user_img} />
        <Typo.Base>{nickname}</Typo.Base>
        <Typo.Micro>{date}</Typo.Micro>
      </HStack>
      <HStack>
        {Array.from({ length: score }).map((_, i) => (
          <Icon
            key={`filled-${i}`}
            name={GlyphIcon.STAR}
            className={s.filledStar}
          />
        ))}
        {Array.from({ length: 5 - score }).map((_, i) => (
          <Icon key={`empty-${i}`} name={GlyphIcon.STAR} />
        ))}
      </HStack>
      <Typo.Base className={elipsis ? s.comment : ""}>{comment}</Typo.Base>
    </VStack>
  );
}
