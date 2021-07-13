import { isWeb, isWeex, isMiniApp, isWeChatMiniProgram, isByteDanceMicroApp, isBaiduSmartProgram, isKuaiShouMiniProgram } from 'universal-env';
import EmbedWeb from './web';
import EmbedMiniApp from './miniapp';
import EmbedWeex from './weex';

let Embed = null;

if (isWeb) {
  Embed = EmbedWeb;
} else if (isMiniApp || isWeChatMiniProgram || isByteDanceMicroApp || isBaiduSmartProgram || isKuaiShouMiniProgram) {
  Embed = EmbedMiniApp;
} else if (isWeex) {
  Embed = EmbedWeex;
} else {
  Embed = EmbedWeb;
}

export default Embed;
export * from './types';


