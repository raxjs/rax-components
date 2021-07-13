import { ForwardRefExoticComponent } from 'rax';
import { ViewProps } from '../types';

export default function wrapDefaultProperties(View: ForwardRefExoticComponent<ViewProps>): ForwardRefExoticComponent<ViewProps> {
  View.displayName = 'View';
  return View;
}
