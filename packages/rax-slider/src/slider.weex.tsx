import { createElement, ForwardRefExoticComponent, forwardRef } from 'rax';
import { SliderProps } from './types';
import './index.css';

const Slider: ForwardRefExoticComponent<SliderProps> = forwardRef(
  (props, ref) => {
    const {
      autoPlay,
      showsPagination,
      paginationStyle,
      autoPlayInterval,
      index,
      loop,
      width,
      height,
      style,
      children,
      ...rest
    } = props;
    return (
      <slider
        {...rest}
        ref={ref}
        className="rax-slider"
        autoPlay={autoPlay}
        interval={autoPlayInterval}
        infinite={loop}
        index={index}
        style={{ width, height, ...style }}
      >
        {showsPagination && (
          <indicator
            className="rax-slider-pagination"
            style={paginationStyle}
          />
        )}
        {children}
      </slider>
    );
  }
);
export default Slider;
