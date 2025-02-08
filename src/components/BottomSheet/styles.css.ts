import { colorVars, radiusVars, spacingVars } from '@tapie-kr/inspire-react';
import { style } from '@vanilla-extract/css';

export const base = style({
  position: 'fixed',
  zIndex: 1000,
  bottom: 0,
  left: 0,
  background: colorVars.surface.clear,
  borderTopLeftRadius: radiusVars.rounded,
  borderTopRightRadius: radiusVars.rounded,
});

export const headerContainer = style({
  paddingBlock: spacingVars.petite,
});

export const header = style({
  width: 120,
  height: 4,
  borderRadius: radiusVars.pill,
  background: colorVars.surface.inverted.clear,
});
