import { createElement, forwardRef, useCallback, useImperativeHandle, useState } from 'rax';
import Children from 'rax-children';
import { isWeChatMiniProgram } from 'universal-env';
import { SliderType } from '../types';
import wrapDefaultProperties from '../utils/wrapDefaultProperties';
import '../index.css';

const Slider: SliderType = forwardRef(
  (props, ref) => {
    const {
      direction,
      autoPlay,
      showsPagination = true,
      paginationStyle = {
        itemColor: 'rgba(255, 255, 255, 0.5)',
        itemSelectedColor: 'rgb(255, 80, 0)'
      },
      autoPlayInterval = 3000,
      index: current,
      loop = true,
      width,
      height,
      style,
      className,
      children,
      onChange,
      ...rest
    } = props;
    const [index, setIndex] = useState(current);

    // @ts-ignore
    useImperativeHandle(ref, () => ({
      slideTo: (newIndex: number) => {
        setIndex(newIndex);
      }
    }));

    const handleChange = useCallback((result: any) => {
      const currentIndex = result.detail.current;
      // Only setState by user touch action in wechat miniprogram
      if (isWeChatMiniProgram) {
        result.detail.source === 'touch' && setIndex(currentIndex);
      } else {
        setIndex(currentIndex);
      }
      result.index = currentIndex;
      onChange && onChange(result);
    }, [props.index, onChange]);

    return (
      <swiper
        {...rest}
        ref={ref}
        className={`rax-slider ${className}`}
        autoplay={autoPlay}
        interval={autoPlayInterval}
        circular={loop}
        current={index}
        vertical={direction === 'vertical'}
        indicator-dots={showsPagination}
        indicator-color={paginationStyle.itemColor}
        indicator-active-color={paginationStyle.itemSelectedColor}
        onChange={handleChange}
        style={{ width: Number(width), height: Number(height), ...style }}
      >
        {Children.map(children, child => child && <swiper-item key={child.key}>{child}</swiper-item>)}
      </swiper>
    );
  }
);

export default wrapDefaultProperties(Slider);
