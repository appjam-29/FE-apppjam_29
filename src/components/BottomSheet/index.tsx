"use client";

import { Box, HStack, VStack } from "@tapie-kr/inspire-react";
import { useEffect, useRef, useState } from "react";
import * as s from "./styles.css";

interface BottomSheetProps {
  children: React.ReactNode;
  height?: number;
  minHeight?: number;
  maxHeight?: number;
}

export default function BottomSheet(props: BottomSheetProps) {
  const { children, height = 300, minHeight = 100, maxHeight } = props;

  const [heightValue, setHeightValue] = useState(height);
  const [isDragging, setIsDragging] = useState(false);
  const [maxHeightValue, setMaxHeightValue] = useState(maxHeight);
  const dragStartY = useRef<number>(0);
  const startHeight = useRef<number>(height);

  useEffect(() => {
    // window 객체는 useEffect 내에서 접근
    setMaxHeightValue(maxHeight || window.innerHeight * 0.8);
  }, [maxHeight]);

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    dragStartY.current = "touches" in e ? e.touches[0].clientY : e.clientY;
    startHeight.current = heightValue;
  };

  const handleDrag = (e: MouseEvent | TouchEvent) => {
    if (!isDragging) return;

    const currentY = "touches" in e ? e.touches[0].clientY : e.clientY;
    const deltaY = dragStartY.current - currentY;
    const newHeight = Math.min(
      Math.max(startHeight.current + deltaY, minHeight),
      maxHeightValue || window.innerHeight * 0.8
    );

    setHeightValue(newHeight);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleDrag);
    document.addEventListener("mouseup", handleDragEnd);
    document.addEventListener("touchmove", handleDrag);
    document.addEventListener("touchend", handleDragEnd);

    return () => {
      document.removeEventListener("mousemove", handleDrag);
      document.removeEventListener("mouseup", handleDragEnd);
      document.removeEventListener("touchmove", handleDrag);
      document.removeEventListener("touchend", handleDragEnd);
    };
  }, [isDragging]);

  useEffect(() => {
    setHeightValue(height);
  }, [height]);

  return (
    <VStack
      fullWidth
      className={s.base}
      style={{
        height: heightValue,
        transition: isDragging ? "none" : "height 0.2s ease",
      }}
    >
      <HStack
        fullWidth
        className={s.headerContainer}
        onMouseDown={handleDragStart}
        onTouchStart={handleDragStart}
        style={{ cursor: "ns-resize" }}
      >
        <Box fullWidth className={s.header} />
      </HStack>
      <Box fullWidth fullHeight>
        {children}
      </Box>
    </VStack>
  );
}
