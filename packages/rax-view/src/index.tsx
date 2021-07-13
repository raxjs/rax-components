import { isMiniApp, isWeb, isWeChatMiniProgram } from 'universal-env';
import ViewCommon from './common';
import ViewAliMiniApp from './miniapp/ali';
import ViewWechatMiniProgram from './miniapp/wechat';

let View = null;

if (isWeb) {
  View = ViewCommon;
} else if (isMiniApp) {
  View = ViewAliMiniApp;
} else if (isWeChatMiniProgram) {
  View = ViewWechatMiniProgram;
} else {
  View = ViewCommon;
}

export default View;


