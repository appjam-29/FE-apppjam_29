import { GlyphIcon, Icon, Typo } from "@tapie-kr/inspire-react";
import * as s from "./style.css";

export default function ReviewPage() {
  return (
    <div className={s.container}>
      <Typo.Moderate>성수 스타벅스 - 리뷰 작성하기</Typo.Moderate>
      <Icon name={GlyphIcon.STAR} />
    </div>
  );
}
