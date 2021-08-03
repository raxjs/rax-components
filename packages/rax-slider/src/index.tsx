import { isWeex, isWeb, isWeChatMiniProgram, isMiniApp, isByteDanceMicroApp, isKuaiShouMiniProgram, isBaiduSmartProgram } from 'universal-env';

let Slider = null;

if (isWeex) {
  Slider = require('./weex');
} else if (!isWeb && (isMiniApp || isWeChatMiniProgram || isByteDanceMicroApp || isKuaiShouMiniProgram || isBaiduSmartProgram)) {
  Slider = require('./miniapp-runtime');
} else {
  Slider = require('./web');
}

if (Slider.default) {
  Slider = Slider.default;
}

export default Slider;
