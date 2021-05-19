import { isWeb, isWeex, isMiniApp, isWeChatMiniProgram, isByteDanceMicroApp, isBaiduSmartProgram, isKuaiShouMiniProgram } from 'universal-env';
import ScrollViewWeb from './web';
import ScrollViewMiniApp from './miniapp';
import ScrollViewWeex from './weex';

let ScrollView = null;

if (isWeb) {
  ScrollView = ScrollViewWeb;
} else if (isMiniApp || isWeChatMiniProgram || isByteDanceMicroApp || isBaiduSmartProgram || isKuaiShouMiniProgram) {
  ScrollView = ScrollViewMiniApp;
} else if (isWeex) {
  ScrollView = ScrollViewWeex;
} else {
  ScrollView = ScrollViewWeb;
}

export default ScrollView;
export * from './types';


