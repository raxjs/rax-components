import { isWeex, isWeb, isWeChatMiniProgram, isMiniApp, isByteDanceMicroApp, isKuaiShouMiniProgram, isBaiduSmartProgram } from 'universal-env';

import SliderWeex from './weex';
import SliderMiniApp from './miniapp-runtime';
import SliderDefault from './web';

let Slider = null;

if (isWeex) {
  Slider = SliderWeex;
} else if (!isWeb && (isMiniApp || isWeChatMiniProgram || isByteDanceMicroApp || isKuaiShouMiniProgram || isBaiduSmartProgram)) {
  Slider = SliderMiniApp;
} else {
  Slider = SliderDefault;
}

if (Slider.default) {
  Slider = Slider.default;
}

export default Slider;
