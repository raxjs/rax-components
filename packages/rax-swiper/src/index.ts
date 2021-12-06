import { isWeb, isMiniApp, isWeChatMiniProgram, isByteDanceMicroApp, isBaiduSmartProgram, isKuaiShouMiniProgram } from 'universal-env';

import * as SwiperWeb from './web';
import * as SwiperMiniprogram from './miniapp-runtime';

let Swiper = null;
let SwiperSlide = null;

if (isWeb) {
  Swiper = SwiperWeb.Swiper;
  SwiperSlide = SwiperWeb.SwiperSlide;
} else if (isMiniApp || isWeChatMiniProgram || isByteDanceMicroApp || isBaiduSmartProgram || isKuaiShouMiniProgram) {
  Swiper = SwiperMiniprogram.Swiper;
  SwiperSlide = SwiperMiniprogram.SwiperSlide;
} else {
  Swiper = SwiperWeb.Swiper;
  SwiperSlide = SwiperWeb.SwiperSlide;
}

export { Swiper, SwiperSlide };

export * from './types';
