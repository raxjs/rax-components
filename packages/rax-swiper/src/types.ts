import { RefAttributes, HTMLAttributes, ForwardRefExoticComponent, FunctionComponent } from 'rax';

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
  autoplay: boolean;
  pagination: boolean;
  loop: boolean;
  initialSlide: number;
  onSlideChange: (eventTarget: EventTarget) => void;
  direction: 'horizontal' | 'vertical';
  paginationColor?: string;
  paginationActiveColor?: string;
}

export type TSwiper = ForwardRefExoticComponent<SwiperProps>;

export type TSwiperSlide = ForwardRefExoticComponent<Record<string, any>> | FunctionComponent;

