import { RefAttributes, HTMLAttributes, CSSProperties, RaxElement, MutableRefObject } from 'rax';

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

export interface MaskRef extends MutableRefObject<HTMLDivElement> {
  __animationValid: boolean;
  __timer: ReturnType<typeof setTimeout>;
  __pendingShow: boolean;
  __pendingHide: boolean;
}
