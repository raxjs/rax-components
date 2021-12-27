import { isWeb, isWeex, isMiniApp, isWeChatMiniProgram, isByteDanceMicroApp, isBaiduSmartProgram, isKuaiShouMiniProgram } from 'universal-env';
import IconWeb from './web';
import IconMiniApp from './miniapp-runtime';
import IconWeex from './weex';

let Icon = null;

if (isWeb) {
  Icon = IconWeb;
} else if (isMiniApp || isWeChatMiniProgram || isByteDanceMicroApp || isBaiduSmartProgram || isKuaiShouMiniProgram) {
  Icon = IconMiniApp;
} else if (isWeex) {
  Icon = IconWeex;
} else {
  Icon = IconWeb;
}

export default Icon;
export * from './types';
