import { getShorthandedValue, spacingVars } from '@tapie-kr/inspire-react';
import { style } from '@vanilla-extract/css';

export const button = style({
  position: 'absolute',
  bottom: 0,
  left: 0,
  padding: getShorthandedValue(spacingVars.base, spacingVars.moderate),
});
