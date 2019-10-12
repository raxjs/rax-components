import { HTMLAttributes, RefAttributes, MouseEventHandler} from 'rax';

export interface TextProps extends RefAttributes<HTMLSpanElement>, HTMLAttributes<HTMLSpanElement> {
  numberOfLines?: number | string;
  onPress?: MouseEventHandler<HTMLSpanElement>;
}
