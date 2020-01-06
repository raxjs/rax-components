import { createElement, ForwardRefExoticComponent, forwardRef, useImperativeHandle, useState } from 'rax';
import { SliderProps } from './types';
import './index.css';

const Slider: ForwardRefExoticComponent<SliderProps> = forwardRef(
  (props, ref) => {
    // This value determines the index of current shown slide in Weex. The default value is 0.
    const [index, setIndex] = useState(props.index || 0);
    const {
      autoPlay,
      showsPagination,
      paginationStyle,
      autoPlayInterval,
      loop,
      width,
      height,
      style,
      children,
      onChange,
      ...rest
    } = props;

    // @ts-ignore
    // Ignore 'HTMLElement error', because it's a Weex Component.
    useImperativeHandle(ref, () => ({
      slideTo: (newIndex: number) => {
        setIndex(newIndex);
      }
    }));

    const handleChange = (result: any) => {
      let currentIndex = 0;
      // https://weex.apache.org/docs/components/slider.html#rax-example
      // The past Weex docs shows that result is an number, But in the new Weex App returns {index:x, timestamp:...}
      if (typeof result === "number") {
        currentIndex = result;
      }
      if (typeof result === "object" && typeof result.index !== "undefined") {
        currentIndex = result.index;
      }
      setIndex(currentIndex);
      onChange && onChange(result);
    }

    return (
      <slider
        {...rest}
        ref={ref}
        className="rax-slider"
        autoPlay={autoPlay}
        interval={autoPlayInterval}
        infinite={loop}
        index={index}
        onChange={handleChange}
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
Slider.displayName = 'Slider';
export default Slider;
