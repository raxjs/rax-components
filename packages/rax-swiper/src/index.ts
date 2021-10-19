import { isWeb, isMiniApp, isWeChatMiniProgram, isByteDanceMicroApp, isBaiduSmartProgram, isKuaiShouMiniProgram } from 'universal-env';

let Swiper = null;

if (isWeb) {
  Swiper = require('./web').default;
} else if (isMiniApp || isWeChatMiniProgram || isByteDanceMicroApp || isBaiduSmartProgram || isKuaiShouMiniProgram) {
  Swiper = require('./miniapp-runtime').default;
} else {
  Swiper = require('./web').default;
}

export default Swiper;

export * from './types';
