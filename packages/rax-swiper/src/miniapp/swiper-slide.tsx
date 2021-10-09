import { createElement, FunctionComponent } from 'rax';

const SwiperSlide: FunctionComponent = (props) => {
  const { children, ...rest } = props;

  return (
    <swiper-item
      className="swiper-slide"
      {...rest}
    >
      {children}
    </swiper-item>
  );
};

SwiperSlide.displayName = 'SwiperSlide';

export default SwiperSlide;