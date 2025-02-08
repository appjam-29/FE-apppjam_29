import { style } from '@vanilla-extract/css';

export const base = style({
  position: 'relative',
});

export const logoContainer = style({
  position: 'absolute',
  top: 180,
  left: '50%',
  transform: 'translateX(-50%)',
});
