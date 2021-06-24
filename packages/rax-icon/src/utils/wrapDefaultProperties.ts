import { ForwardRefExoticComponent } from 'rax';
import { IconProps } from '../types';

export default function wrapDefaultProperties(Icon: ForwardRefExoticComponent<IconProps>): ForwardRefExoticComponent<IconProps> {
  Icon.displayName = 'Icon';
  return Icon;
}
