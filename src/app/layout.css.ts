import { globalStyle, style } from '@vanilla-extract/css';

export const layout = style({
  width: '100%',
  height: '100dvh',
});

globalStyle('*', {
  userSelect: 'none',
});

export const base = style({
  height: '100dvh',
});
