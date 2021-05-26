import { ForwardRefExoticComponent } from 'rax';
import { ViewProps } from '../types';

export default function wrapper(view: ForwardRefExoticComponent<ViewProps>): ForwardRefExoticComponent<ViewProps> {
  view.displayName = 'View';
  return view;
}
