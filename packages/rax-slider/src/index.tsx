import { ForwardRefExoticComponent, Fragment } from 'rax';
import { isWeex, isWeb, isWeChatMiniProgram, isMiniApp, isByteDanceMicroApp, isKuaiShouMiniProgram, isBaiduSmartProgram } from 'universal-env';
import { SliderProps } from './types';

let Slider = null;

if (isWeex) {
  Slider = require('./weex');
} else if (!isWeb && (isMiniApp || isWeChatMiniProgram || isByteDanceMicroApp || isKuaiShouMiniProgram || isBaiduSmartProgram)) {
  Slider = require('./miniapp');
} else {
  Slider = require('./web');
}

if (Slider.default) {
  Slider = Slider.default;
}

Slider.Item = Fragment;

type SliderType = ForwardRefExoticComponent<SliderProps> & { Item: typeof Fragment };

export default Slider as SliderType;
