"use client";

import * as s from "./styles.css";

import {
  colorVars,
  GlyphIcon,
  HStack,
  Icon,
  spacingVars,
  StackAlign,
  StackJustify,
  Typo,
  VStack,
  Weight,
} from "@tapie-kr/inspire-react";

interface PlaceCategoryProps {
  label: string;
  onClick: any;
  count: number;
}

export default function PlaceCategory(props: PlaceCategoryProps) {
  const { label, onClick, count } = props;

  return (
    <VStack
      fullWidth
      className={s.base}
      spacing={spacingVars.petite}
      align={StackAlign.START}
      onClick={onClick}
    >
      <HStack justify={StackJustify.BETWEEN} fullWidth>
        <Typo.Base weight={Weight.SEMIBOLD}>{label}</Typo.Base>
        <Icon
          name={GlyphIcon.CHEVRON_RIGHT}
          size={24}
          color={colorVars.content.default}
        />
      </HStack>
      <Typo.Micro weight={Weight.MEDIUM} color={colorVars.content.default}>
        +{count}개의 장소
      </Typo.Micro>
    </VStack>
  );
}
