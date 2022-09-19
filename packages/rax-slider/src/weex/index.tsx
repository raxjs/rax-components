import { createElement, forwardRef, useCallback, useImperativeHandle, useRef, useState } from 'rax';
import { SliderType } from '../types';
import wrapDefaultProperties from '../utils/wrapDefaultProperties';
import '../index.css';

declare const __weex_v2__: any;
/* global __weex_v2__ */
const isWeexV2 = typeof __weex_v2__ === 'object';

const Slider: SliderType = forwardRef(
  (props, ref) => {
    // This value determines the index of current shown slide in Weex. The default value is 0.
    const [index, setIndex] = useState(props.index || 0);
    const sliderRef = useRef<HTMLDivElement>(null);
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

    // Ignore 'HTMLElement Error', because it's a Weex Component.
    // @ts-ignore
    useImperativeHandle(ref, () => ({
      slideTo: (index: number | { index: number; animated?: boolean }) => {
        if (index === +index) {
          setIndex(index);
        } else {
          const { index: idx, animated } = index as { index: number; animated?: boolean };
          setIndex(idx);
          if (isWeexV2) {
            const slider = sliderRef.current as any;
            slider.slideTo && slider.slideTo(idx, { animated });
          }
        }
      },
    }));

    const handleChange = useCallback((result: any) => {
      let currentIndex = 0;
      // https://weex.apache.org/docs/components/slider.html#rax-example
      // The past Weex docs shows that the 'result' is a number, But in the new Weex App returns {index:x, timestamp:...}
      if (typeof result === 'number') {
        currentIndex = result;
      }
      if (typeof result === 'object' && typeof result.index === 'number') {
        currentIndex = result.index;
      }
      setIndex(currentIndex);
      onChange && onChange(result);
    }, [props.index, onChange]);

    return (
      <slider
        {...rest}
        ref={sliderRef}
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

export default wrapDefaultProperties(Slider);
