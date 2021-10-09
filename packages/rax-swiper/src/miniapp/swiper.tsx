import { createElement, useRef, useState, useEffect, forwardRef, useImperativeHandle, useMemo, ForwardRefExoticComponent } from 'rax';
import Children from 'rax-children';

import { SwiperProps } from '../types';

const Swiper: ForwardRefExoticComponent<SwiperProps> = forwardRef((props, ref) => {
  const {
    autoplay = false,
    pagination = true,
    loop = true,
    initialSlide = 0,
    onSlideChange,
    direction = 'horizontal',
    children,
    onSwiper,
    ...rest
  } = props;

  const [ activeIndex, setActiveIndex ] = useState(initialSlide);
  const size = useMemo(() => Children.count(children), [children]);
  const swiperRef = useRef(null);
  const activeIndexRef = useRef(activeIndex);

  const slideChange = (event) => {
    if (onSlideChange) {
      onSlideChange({
        activeIndex: event.detail.current,
        activeItemId: event.detail.currentItemId
      });
    }
  };

  const methods = {
    slideNext() {
      activeIndexRef.current = activeIndexRef.current + 1 >= size ? 0 : activeIndexRef.current + 1;
      setActiveIndex(activeIndexRef.current);
    },
    slidePrev() {
      activeIndexRef.current = activeIndexRef.current - 1 < 0 ? size - 1 : activeIndexRef.current - 1;
      setActiveIndex(activeIndexRef.current);
    },
    slideTo(index) {
      activeIndexRef.current = index;
      setActiveIndex(activeIndexRef.current);
    }
  };

  swiperRef.current = {
    activeIndex: activeIndexRef.current,
    ...methods
  };

  useImperativeHandle(ref, () => {
    return {
      activeIndex: activeIndexRef.current,
      ...methods
    };
  });

  useEffect(() => {
    if (onSwiper) {
      onSwiper(swiperRef.current);
    }
  }, []);

  return (
    <view>
      <swiper
        indicator-dots={pagination}
        autoplay={autoplay}
        current={activeIndex}
        vertical={direction === 'vertical'}
        onChange={slideChange}
        circular={loop}
        className="swiper-container"
        {...rest}
      >
        {children}
      </swiper>
    </view>
  );
});

Swiper.displayName = 'Swiper';

export default Swiper;