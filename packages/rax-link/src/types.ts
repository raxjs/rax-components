import { RefAttributes, HTMLAttributes, MouseEventHandler } from 'rax';

export interface LinkProps extends RefAttributes<HTMLAnchorElement>, HTMLAttributes<HTMLAnchorElement> {
  onPress?: MouseEventHandler<HTMLAnchorElement>;
}
