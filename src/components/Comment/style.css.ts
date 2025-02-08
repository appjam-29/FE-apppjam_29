import { globalStyle, style } from "@vanilla-extract/css";

export const profile_img = style({
  width: "36px",
  height: "36px",
  borderRadius: "50%",
});
export const filledStar = style({
  color: "red",
});

export const comment = style({
  textOverflow: "ellipsis",
  overflow: "hidden",
  wordBreak: "break-word",
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
});
