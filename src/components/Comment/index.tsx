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
}

export default function Comment({
  nickname,
  user_img,
  date,
  score,
  comment,
}: Props) {
  return (
    <VStack fullWidth align={StackAlign.START} spacing={4}>
      <HStack spacing={8}>
        <img className={s.profile_img} src={user_img} />
        <Typo.Base>{nickname}</Typo.Base>
        <Typo.Micro>{date}</Typo.Micro>
      </HStack>
      <HStack>
        {Array.from({ length: score }).map(() => (
          <Icon name={GlyphIcon.STAR} className={s.filledStar} />
        ))}
        {Array.from({ length: 5 - score }).map(() => (
          <Icon name={GlyphIcon.STAR} />
        ))}
      </HStack>
      <Typo.Base className={s.comment}>{comment}</Typo.Base>
    </VStack>
  );
}
