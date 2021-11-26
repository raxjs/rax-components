import { createElement, useRef, useState, forwardRef, useImperativeHandle, useMemo } from 'rax';
import Children from 'rax-children';

import { SwiperType } from '../types';
import './swiper.css';

const Swiper: SwiperType = forwardRef((props, ref) => {
  const {
    autoplay = false,
    pagination = true,
    loop = true,
    initialSlide = 0,
    onSlideChange,
    direction = 'horizontal',
    children,
    interval,
    paginationStyle = {},
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
      if (index !== undefined) {
        activeIndexRef.current = index;
        setActiveIndex(activeIndexRef.current);
      }
    }
  };

  swiperRef.current = {
    activeIndex: activeIndexRef.current,
    ...methods
  };

  const {
    autoplay: _autoplay,
    pagination: _pagination,
    vertical: _vertical,
    interval: _interval,
    paginationStyle: _paginationStyle
  } = useMemo(() => {
    return {
      autoplay: typeof autoplay === 'boolean' ? autoplay : true,
      pagination: typeof pagination === 'boolean' ? pagination : true,
      vertical: direction === 'vertical',
      interval: interval || 3000,
      paginationStyle: {
        itemColor: paginationStyle.itemColor || 'rgba(0, 0, 0, .3)',
        itemActiveColor: paginationStyle.itemActiveColor || '#000000'
      }
    }
  }, [autoplay, pagination, direction, interval, paginationStyle]);

  useImperativeHandle(ref, () => {
    return {
      activeIndex: activeIndexRef.current,
      ...methods
    };
  });

  return (
    <swiper
      indicator-dots={_pagination}
      autoplay={_autoplay}
      current={activeIndex}
      vertical={_vertical}
      onChange={slideChange}
      circular={loop}
      className="swiper-container"
      interval={_interval}
      indicator-color={_paginationStyle.itemColor}
      indicator-active-color={_paginationStyle.itemActiveColor}
      {...rest}
    >
      {children}
    </swiper>
  );
});

Swiper.displayName = 'Swiper';

export default Swiper;
