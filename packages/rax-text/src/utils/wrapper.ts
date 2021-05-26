import { ForwardRefExoticComponent } from 'rax';
import { TextProps } from '../types';

export default function wrapper(text: ForwardRefExoticComponent<TextProps>): ForwardRefExoticComponent<TextProps> {
  text.displayName = 'ScrollView';
  return text;
}
