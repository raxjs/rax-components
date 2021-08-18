import * as Rax from 'rax';

export interface SliderType extends Rax.ForwardRefExoticComponent<SliderProps> {
  Item?: typeof Rax.Fragment;
}

export interface SliderProps
  extends Rax.RefAttributes<HTMLElement>,
  Rax.HTMLAttributes<HTMLElement> {
  className?: string;
  style?: Rax.CSSProperties;
  index?: number;
  autoPlay?: boolean;
  showsPagination?: boolean;
  paginationStyle?: {
    [key: string]: any;
    itemSize?: number;
    itemColor?: string;
    itemSelectedColor?: string;
  };
  autoPlayInterval?: number;
  loop?: boolean;
  width?: string | number;
  height?: string | number;
  activeDot?: Rax.RaxNode;
  normalDot?: Rax.RaxNode;
  initialVelocityThreshold?: number;
  verticalThreshold?: number;
  vertical?: boolean;
  horizontalThreshold?: number;
  onChange?: (e: any) => void;
}

export interface SwipeEventProps
  extends Rax.RefAttributes<HTMLDivElement>,
  Rax.HTMLAttributes<HTMLDivElement> {
  onSwipeBegin?: (e: any) => void;
  onSwipe?: (e: any) => void;
  onSwipeEnd?: (e: any) => void;
  horizontal?: boolean;
  left?: boolean;
  right?: boolean;
  up?: boolean;
  down?: boolean;
}
