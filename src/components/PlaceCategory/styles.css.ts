import {
  getShorthandedValue,
  spacingVars,
  utilityClass,
} from '@tapie-kr/inspire-react';
import { style } from '@vanilla-extract/css';

export const base = style([
  utilityClass.interactive,
  {
    padding: getShorthandedValue(spacingVars.petite, spacingVars.base),
  },
]);
