import { isWeb, isWeex, isMiniApp, isWeChatMiniProgram, isByteDanceMicroApp, isBaiduSmartProgram, isKuaiShouMiniProgram } from 'universal-env';
import IconWeb from './web';
import IconMiniApp from './miniapp-runtime';
import IconWeex from './weex';
import { createIconSet as rawCreateIconSet } from './createIconSet';

let Icon = null;

if (isWeb) {
  Icon = IconWeb;
} else if (isMiniApp || isWeChatMiniProgram || isByteDanceMicroApp || isBaiduSmartProgram || isKuaiShouMiniProgram) {
  Icon = IconMiniApp;
} else if (isWeex) {
  Icon = IconWeex;
} else {
  Icon = IconWeb;
}

export default Icon;
export * from './types';

export function createIconSet(
  glyphMap = {},
  fontFamily: string,
  fontFile: string
) {
  return rawCreateIconSet(Icon, glyphMap, fontFamily, fontFile);
}
