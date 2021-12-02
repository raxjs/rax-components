import { createElement, useState, forwardRef, useImperativeHandle, useMemo } from 'rax';
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
    interval = 3000,
    paginationStyle = {
      itemColor: 'rgba(0, 0, 0, .3)',
      itemActiveColor: '#000000'
    },
    ...rest
  } = props;

  const [ activeIndex, setActiveIndex ] = useState(initialSlide);
  const size = useMemo(() => Children.count(children), [children]);

  const slideChange = (event) => {
    if (onSlideChange) {
      onSlideChange({
        activeIndex: event.detail.current,
        activeItemId: event.detail.currentItemId
      });
    }
    setActiveIndex(event.detail.current);
  };

  const methods = {
    slideNext() {
      if (activeIndex + 1 < size) {
        setActiveIndex(activeIndex + 1);
      }
    },
    slidePrev() {
      if (activeIndex - 1 >= 0) {
        setActiveIndex(activeIndex - 1);
      }
    },
    slideTo(index) {
      if (typeof index === 'number' && index >= 0 && index < size) {
        setActiveIndex(index);
      }
    }
  };

  const {
    autoplay: _autoplay,
    pagination: _pagination,
    vertical: _vertical,
  } = useMemo(() => {
    return {
      // compat web: in swiper.js, autoplay and pagination may be boolean or object type;
      autoplay: typeof autoplay === 'boolean' ? autoplay : true,
      pagination: typeof pagination === 'boolean' ? pagination : true,
      vertical: direction === 'vertical'
    };
  }, [autoplay, pagination, direction]);

  useImperativeHandle(ref, () => {
    return {
      activeIndex,
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
      interval={interval}
      indicator-color={paginationStyle.itemColor}
      indicator-active-color={paginationStyle.itemActiveColor}
      {...rest}
    >
      {children}
    </swiper>
  );
});

Swiper.displayName = 'Swiper';

export default Swiper;
