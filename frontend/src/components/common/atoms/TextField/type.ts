import type { IconType } from 'react-icons';

export type Props = {
  value?: string;
  type?: string;
  placeholder?: string;
  rows?: number;
  style?: React.CSSProperties;
  onChange?: any,
  onClick?: any,
  Icon?: IconType,
}