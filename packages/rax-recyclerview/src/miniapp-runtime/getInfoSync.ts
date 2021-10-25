/* eslint-disable */
import { isMiniApp, isWeChatMiniProgram, isByteDanceMicroApp, isBaiduSmartProgram, isKuaiShouMiniProgram } from 'universal-env';


export default function getInfoSync(): {
  windowHeight: number;
  windowWidth: number;
} {
  if (isWeChatMiniProgram) {
    // @ts-ignore
    return wx.getSystemInfoSync();
  }
  if (isByteDanceMicroApp) {
    // @ts-ignore
    return tt.getSystemInfoSync();
  }

  if (isMiniApp) {
    // @ts-ignore
    const isDingdingMiniapp = typeof dd !== 'undefined' && dd !== null && typeof dd.alert !== 'undefined';
    if (isDingdingMiniapp) {
      // @ts-ignore
      return dd.getSystemInfoSync();
    }
    return my.getSystemInfoSync();
  }

  if (isBaiduSmartProgram) {
    // @ts-ignore
    return swan.getSystemInfoSync();
  }

  if (isKuaiShouMiniProgram) {
    // @ts-ignore
    return ks.getSystemInfoSync();
  }

  throw new Error('getInfoSync 暂不支持');
}


