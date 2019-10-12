import * as Rax from 'rax';

export interface SliderProps
  extends Rax.RefAttributes<HTMLElement>,
  Rax.HTMLAttributes<HTMLElement> {
  className?: string;
  style?: Rax.CSSProperties;
  index?: number;
  autoPlay?: boolean;
  showsPagination?: boolean;
  paginationStyle?: {
    itemSize?: number;
    itemColor?: string;
    itemSelectedColor?: string;
  };
  autoPlayInterval?: number;
  loop?: boolean;
  width?: string;
  height?: string;
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
