import { style } from "@vanilla-extract/css";

export const container = style({
  display: "flex",
  flexDirection: "column",
});

export const header = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "14px 12px",
});

export const left = style({
  display: "flex",
  gap: "4px",
  alignItems: "center",
});
