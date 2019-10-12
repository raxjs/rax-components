import { RefAttributes, HTMLAttributes, MouseEventHandler } from 'rax';

export interface LinkProps extends RefAttributes<HTMLLinkElement>, HTMLAttributes<HTMLLinkElement> {
  onPress?: MouseEventHandler<HTMLLinkElement>;
}
