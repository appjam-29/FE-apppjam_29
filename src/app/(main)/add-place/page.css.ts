import {
  colorVars,
  radiusVars,
  spacingVars,
  utilityClass,
} from '@tapie-kr/inspire-react';
import { style } from '@vanilla-extract/css';

export const base = style({
  paddingInline: spacingVars.moderate,
  paddingBlock: spacingVars.medium,
});

export const searchResult = style([
  utilityClass.interactive,
  {
    paddingBlock: spacingVars.moderate,
    paddingInline: spacingVars.medium,
    background: colorVars.surface.elevated,
    borderRadius: radiusVars.smooth,
  },
]);
