import { RefAttributes, HTMLAttributes, ForwardRefExoticComponent } from 'rax';

export interface SwiperRefObject {
  activeIndex: number;
  slideNext: () => void;
  slidePrev: () => void;
  slideTo: (index: number) => void;
}

export interface EventTarget {
  activeIndex: number;
  activeItemId?: string;
}

export interface SwiperProps extends RefAttributes<SwiperRefObject>, HTMLAttributes<HTMLDivElement>{
  autoplay?: boolean | object;
  pagination?: boolean | object;
  loop?: boolean;
  initialSlide?: number;
  onSlideChange?: (eventTarget: EventTarget) => void;
  direction?: 'horizontal' | 'vertical';
  interval?: number;
  paginationStyle?: {
    itemColor?: string;
    itemActiveColor?: string;
  }
}

export interface SwiperType extends ForwardRefExoticComponent<SwiperProps> {
};

