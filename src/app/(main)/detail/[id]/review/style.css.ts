import { style } from "@vanilla-extract/css";

export const container = style({
  width: "100%",
  height: "100vh",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  padding: "5px 20px",
});

export const placeName = style({
  textAlign: "center",
});

export const stars = style({
  display: "flex",
  gap: "8px",
  cursor: "pointer",
  marginTop: "33px",
});

export const filledStar = style({
  color: "red",
});

export const emptyStar = style({
  color: "gray",
});

export const select = style({
  width: "100%",
  marginTop: "20px",
  padding: "10px",
  fontSize: "16px",
  border: "1px solid #ccc",
  borderRadius: "8px",
  backgroundColor: "#f5f5f5",
  color: "#333",
  cursor: "pointer",
  outline: "none",
  transition: "0.3s ease-in-out",

  ":hover": {
    backgroundColor: "#e0e0e0",
  },

  ":focus": {
    borderColor: "#888",
  },
});

export const textarea = style({
  marginTop: "15px",
  padding: "12px",
  border: "1px solid gray",
  width: "100%",
  height: "136px",
  borderRadius: "8px",
});

export const writeButton = style({
  padding: "6px 12px",
  borderRadius: "4px",
  background: "#000",
  color: "#fff",
  marginLeft: "auto",
  marginTop: "12px",
});
