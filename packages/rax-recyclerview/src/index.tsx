import { isWeb, isWeex, isMiniApp, isWeChatMiniProgram, isByteDanceMicroApp, isBaiduSmartProgram, isKuaiShouMiniProgram } from '@uni/env';
import RecyclerViewWeb from './web';
import RecyclerViewWeex from './weex';
import RecyclerViewMiniProgram from './miniapp-runtime';

let RecyclerView = null;

if (isWeex) {
  RecyclerView = RecyclerViewWeex;
} else if (isWeb) {
  RecyclerView = RecyclerViewWeb;
} else if (isMiniApp || isWeChatMiniProgram || isByteDanceMicroApp || isBaiduSmartProgram || isKuaiShouMiniProgram) {
  RecyclerView = RecyclerViewMiniProgram;
} else {
  RecyclerView = RecyclerViewWeb;
}

export * from './VirtualizedList/types';
export default RecyclerView;

