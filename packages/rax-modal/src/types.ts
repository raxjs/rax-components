import { RefAttributes, HTMLAttributes, CSSProperties, RaxElement } from 'rax';

export interface ModalProps extends RefAttributes<HTMLDivElement>, HTMLAttributes<HTMLDivElement> {
  visible: boolean;
  children?: RaxElement;
  maskCanBeClick?: boolean;
  maskStyle?: CSSProperties;
  contentStyle?: CSSProperties;
  delay?: number;
  duration?: number | [number] | [number, number]; // [number, number?] not work
  onShow?: () => void;
  onHide?: () => void;
}
