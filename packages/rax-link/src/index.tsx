import { isWeb, isMiniApp, isWeChatMiniProgram, isByteDanceMicroApp, isBaiduSmartProgram, isKuaiShouMiniProgram } from 'universal-env';
import LinkCommon from './common';
import LinkMiniApp from './miniapp';

let Link = null;

// If miniapp env is web, should use element <a>
if ((isMiniApp || isWeChatMiniProgram || isByteDanceMicroApp || isBaiduSmartProgram || isKuaiShouMiniProgram) && !isWeb) {
  Link = LinkMiniApp;
}  else {
  Link = LinkCommon;
}

export default Link;
export * from './types';


