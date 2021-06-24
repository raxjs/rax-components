import { ForwardRefExoticComponent } from 'rax';
import { TextProps } from '../types';

export default function wrapDefaultProperties(Text: ForwardRefExoticComponent<TextProps>): ForwardRefExoticComponent<TextProps> {
  Text.displayName = 'ScrollView';
  return Text;
}
