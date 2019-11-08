import { ForwardRefExoticComponent, Fragment } from 'rax';
import { isWeex } from 'universal-env';
import { SliderProps } from './types';

let Slider = null;

if (isWeex) {
  Slider = require('./slider.weex');
} else {
  Slider = require('./slider.web');
}

if (Slider.default) {
  Slider = Slider.default;
}

Slider.Item = Fragment;

export default Slider as ForwardRefExoticComponent<SliderProps>;
