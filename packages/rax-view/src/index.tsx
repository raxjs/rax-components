import { isWeex, isMiniApp, isWeb, isWeChatMiniProgram } from 'universal-env';
import ViewCommon from './common';
import ViewWeex from './weex';
import ViewAliMiniApp from './miniapp/ali';
import ViewWechatMiniProgram from './miniapp/wechat';

declare const __weex_v2__: any;
/* global __weex_v2__ */
const isWeex1 = isWeex && typeof __weex_v2__ !== 'object';

let View = null;

if (isWeb) {
  View = ViewCommon;
} else if (isMiniApp) {
  View = ViewAliMiniApp;
} else if (isWeChatMiniProgram) {
  View = ViewWechatMiniProgram;
} else if (isWeex1) {
  View = ViewWeex;
} else {
  View = ViewCommon;
}

export default View;
