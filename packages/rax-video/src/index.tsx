import { isWeb, isWeex, isMiniApp, isWeChatMiniProgram, isByteDanceMicroApp, isBaiduSmartProgram, isKuaiShouMiniProgram } from 'universal-env';
import VideoWeb from './web';
import VideoMiniApp from './miniapp-runtime';
import VideoWeex from './weex';

let Video = null;

if (isWeb) {
  Video = VideoWeb;
} else if (isMiniApp || isWeChatMiniProgram || isByteDanceMicroApp || isBaiduSmartProgram || isKuaiShouMiniProgram) {
  Video = VideoMiniApp;
} else if (isWeex) {
  Video = VideoWeex;
} else {
  Video = VideoWeb;
}

export default Video;
export * from './types';


