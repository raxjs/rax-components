import { isWeb, isWeex, isMiniApp, isWeChatMiniProgram, isByteDanceMicroApp, isBaiduSmartProgram, isKuaiShouMiniProgram } from 'universal-env';
import { VirtualizedList } from './VirtualizedList/types';

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

export default RecyclerView as VirtualizedList;

