import { style } from "@vanilla-extract/css";

export const container = style({
  display: "flex",
  padding: "8px 24px",
  width: "100%",
  height: "100%",
  flexDirection: "column",
});

export const header = style({
  display: "flex",
  alignItems: "center",
});

export const headerText = style({
  color: "#000",
  position: "absolute",
  transform: "translateX(-50%)",
  left: "50%",
});

export const order = style({
  padding: "0 4px",
  background: "#0D0D0D",
  color: "#fff",
  borderRadius: "9999px",
  textAlign: "center",
  width: "40px",
});

export const title = style({
  marginTop: "32px",
  display: "flex",
  flexDirection: "column",
  gap: "8px",
});

export const titleText = style({
  whiteSpace: "pre-line",
});

export const purposeBox = style({
  marginTop: "64px",
  display: "flex",
  flexDirection: "column",
  gap: "4px",
});

export const purposeText = style({
  display: "flex",
  gap: "2px",
});

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
