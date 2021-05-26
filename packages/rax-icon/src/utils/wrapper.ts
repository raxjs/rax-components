import { ForwardRefExoticComponent } from 'rax';
import { IconProps } from '../types';

export default function wrapper(icon: ForwardRefExoticComponent<IconProps>): ForwardRefExoticComponent<IconProps> {
  icon.displayName = 'Icon';
  return icon;
}
