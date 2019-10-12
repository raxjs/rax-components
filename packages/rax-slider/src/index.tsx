import { ForwardRefExoticComponent } from 'rax';
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

export default Slider as ForwardRefExoticComponent<SliderProps>;
