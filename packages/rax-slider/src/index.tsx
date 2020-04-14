import { ForwardRefExoticComponent, Fragment } from 'rax';
import { isWeex, isWeChatMiniProgram, isMiniApp, isByteDanceMicroApp } from 'universal-env';
import { SliderProps } from './types';

let Slider = null;

if (isWeex) {
  Slider = require('./slider.weex');
} else if (isMiniApp || isWeChatMiniProgram || isByteDanceMicroApp) {
  Slider = require('./slider.miniapp');
} else {
  Slider = require('./slider.web');
}

if (Slider.default) {
  Slider = Slider.default;
}

Slider.Item = Fragment;

export default Slider as ForwardRefExoticComponent<SliderProps>;
