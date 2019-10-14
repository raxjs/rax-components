import { RefAttributes, HTMLAttributes, CSSProperties } from 'rax';

export interface ModalProps extends RefAttributes<HTMLDivElement>, HTMLAttributes<HTMLDivElement> {
  visible: boolean;
  maskCanBeClick?: boolean;
  maskStyle?: CSSProperties;
  contentStyle?: CSSProperties;
  delay?: number;
  duration?: number | [number] | [number, number]; // [number, number?] not work
  onShow?: () => void;
  onHide?: () => void;
}
