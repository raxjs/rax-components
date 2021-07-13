import { isWeb, isWeex, isMiniApp, isWeChatMiniProgram, isByteDanceMicroApp, isBaiduSmartProgram, isKuaiShouMiniProgram } from 'universal-env';
import TextWeb from './web';
import TextMiniApp from './miniapp-runtime';
import TextWeex from './weex';

let Text = null;

if (isWeb) {
  Text = TextWeb;
} else if (isMiniApp || isWeChatMiniProgram || isByteDanceMicroApp || isBaiduSmartProgram || isKuaiShouMiniProgram) {
  Text = TextMiniApp;
} else if (isWeex) {
  Text = TextWeex;
} else {
  Text = TextWeb;
}

export default Text;
export * from './types';


