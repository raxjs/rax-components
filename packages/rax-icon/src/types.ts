import { HTMLAttributes, RefAttributes } from 'rax';

export interface IconFontProps extends RefAttributes<HTMLSpanElement>, HTMLAttributes<HTMLSpanElement> {
  name: string;
}

export interface IconProps {
  source: {
    uri?: string;
    codePoint?: string;
  };
  fontFamily?: string;
  [key: string]: any;
}
