import { ForwardRefExoticComponent } from 'rax';
import { LinkProps } from '../types';

export default function wrapper(link: ForwardRefExoticComponent<LinkProps>): ForwardRefExoticComponent<LinkProps> {
  link.displayName = 'Link';
  return link;
}
