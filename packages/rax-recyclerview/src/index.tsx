import { isWeb, isWeex, isMiniApp, isWeChatMiniProgram, isByteDanceMicroApp, isBaiduSmartProgram, isKuaiShouMiniProgram } from 'universal-env';

let RecyclerView = null;

if (isWeex) {
  RecyclerView = require('./weex');
} else if (!isWeb && (isMiniApp || isWeChatMiniProgram || isByteDanceMicroApp || isBaiduSmartProgram || isKuaiShouMiniProgram)) {
  RecyclerView = require('./miniapp-runtime');
} else {
  RecyclerView = require('./web');
}

if (RecyclerView.default) {
  RecyclerView = RecyclerView.default;
}

export * from './VirtualizedList/types';
export default RecyclerView;

