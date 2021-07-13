import { ForwardRefExoticComponent } from 'rax';
import { LinkProps } from '../types';

export default function wrapDefaultProperties(Link: ForwardRefExoticComponent<LinkProps>): ForwardRefExoticComponent<LinkProps> {
  Link.displayName = 'Link';
  return Link;
}
