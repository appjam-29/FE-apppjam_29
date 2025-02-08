import { getShorthandedValue, spacingVars } from '@tapie-kr/inspire-react';
import { style } from '@vanilla-extract/css';

export const base = style({
  padding: getShorthandedValue(0, spacingVars.moderate),
});

export const item = style([
  {
    padding: getShorthandedValue(spacingVars.micro, spacingVars.base),
  },
]);
