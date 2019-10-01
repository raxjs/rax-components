import * as Rax from 'rax';

export interface Props extends Rax.Attributes {
  style?: Rax.CSSProperties;
  className?: string;
  children?: (string | undefined)[] | string;
  numberOfLines?: number;
  onPress?: (e: MouseEvent) => void;
}
