import { globalStyle, style } from "@vanilla-extract/css";

export const banner = style({
  width: "100%",
  height: "180px",
  objectFit: "cover",
});
export const line = style({
  width: "100%",
  border: "0.5px solid #8A8A8A",
});
export const padding = style({
  padding: "16px 8px",
});

export const selfCenter = style({
  alignSelf: "center",
  width: "100%",
});
globalStyle(`${selfCenter} > div`, {
  margin: "0 auto",
});
