import { isWeb, isWeex, isMiniApp, isWeChatMiniProgram, isByteDanceMicroApp, isBaiduSmartProgram, isKuaiShouMiniProgram } from 'universal-env';
import ImageWeb from './web';
import ImageMiniApp from './miniapp-runtime';
import ImageWeex from './weex';

let Image = null;

if (isWeb) {
  Image = ImageWeb;
} else if (isMiniApp || isWeChatMiniProgram || isByteDanceMicroApp || isBaiduSmartProgram || isKuaiShouMiniProgram) {
  Image = ImageMiniApp;
} else if (isWeex) {
  Image = ImageWeex;
} else {
  Image = ImageWeb;
}

export default Image;
export * from './types';


