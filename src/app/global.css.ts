import { globalStyle } from "@vanilla-extract/css";

const breakpoints = {
  desktopLarge: "1440px",
  desktop: "1026px",
  tablet: "1025px",
  tabletSmall: "768px",
  mobile: "540px",
  mobileSmall: "300px",
};

globalStyle(":root", {
  "@media": {
    [`screen and (min-width: ${breakpoints.desktop}) and (max-width: ${breakpoints.desktopLarge})`]:
      {
        fontSize: "90%",
      },
    [`screen and (min-width: ${breakpoints.tablet}) and (max-width: ${breakpoints.desktop})`]:
      {
        fontSize: "80%",
      },
    [`screen and (min-width: ${breakpoints.mobile}) and (max-width: ${breakpoints.tabletSmall})`]:
      {
        fontSize: "70%",
      },
    [`screen and (min-width: ${breakpoints.mobileSmall}) and (max-width: ${breakpoints.mobile})`]:
      {
        fontSize: "60%",
      },
    [`screen and (max-width: ${breakpoints.mobileSmall})`]: {
      fontSize: "50%",
    },
  },
});

globalStyle("*", {
  margin: "0",
  padding: "0",
  boxSizing: "border-box",
});

globalStyle("ul, li", {
  listStyle: "none",
});

globalStyle("p", {
  display: "inline-block",
});

globalStyle("a", {
  display: "inline-block",
  textDecoration: "none",
  color: "inherit",
});

globalStyle("label", {
  cursor: "pointer",
});

globalStyle("input, textarea", {
  userSelect: "auto",
  border: "none",
  outline: "none",
  resize: "none",
});

globalStyle("input:focus", {
  outline: "none",
});

globalStyle("button", {
  outline: "none",
  border: "none",
  background: "none",
  padding: "0",
  cursor: "pointer",
});
