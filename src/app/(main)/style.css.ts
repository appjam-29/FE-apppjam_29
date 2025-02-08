import { style } from "@vanilla-extract/css";

export const purposes = style({
  display: "flex",
  width: "100%",
  borderRadius: "4px",
  background: "rgba(0, 0, 0, 0.04)",
});

export const purpose = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flex: 1,
  padding: "12px",
  cursor: "pointer",
  transition: "background 0.2s, color 0.2s",
  color: "rgba(0, 0, 0, 0.56)",
  borderRadius: "4px",
});

export const purposeSelected = style({
  background: "rgba(0, 0, 0, 0.04)",
  color: "#000",
});

export const content = style({
  padding: "13px 17px",
});

export const latestOrPlace = style({
  marginTop: "20px",
});

export const flexStart = style({
  justifyContent: "flex-start",
});
export const item = style({
  padding: "12px",
  borderBottom: "1px solid #8A8A8A",
});
export const img = style({
  width: "60px",
  height: "60px",
  borderRadius: "8px",
});

export const filterContainer = style({
  background: "#fff",
  padding: "8px 12px",
});

export const selectedImg = style({
  width: "120px",
  height: "120px",
  borderRadius: "8px",
});
