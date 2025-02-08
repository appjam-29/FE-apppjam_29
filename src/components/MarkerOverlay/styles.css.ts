import { getShorthandedValue } from '@tapie-kr/inspire-react';
import { keyframes, style } from '@vanilla-extract/css';

const pulse = keyframes({
  '0%': {
    transform: 'scale(0.95)',
    opacity: 0.8,
  },
  '50%': {
    transform: 'scale(1.05)',
    opacity: 0.4,
  },
  '100%': {
    transform: 'scale(0.95)',
    opacity: 0.8,
  },
});

export const container = style({
  position: 'relative',
  width: '20px',
  height: '20px',
});

export const innerCircle = style({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '16px',
  height: '16px',
  backgroundColor: '#4B89FF',
  border: getShorthandedValue('1px', 'solid', 'black'),
  borderRadius: '50%',
  zIndex: 2,
});

export const outerCircle = style({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '20px',
  height: '20px',
  backgroundColor: 'rgba(75, 137, 255, 0.2)',
  borderRadius: '50%',
  animation: `${pulse} 2s ease-in-out infinite`,
  zIndex: 1,
});
