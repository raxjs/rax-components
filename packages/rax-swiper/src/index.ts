import { isWeb, isMiniApp, isWeChatMiniProgram, isByteDanceMicroApp, isBaiduSmartProgram, isKuaiShouMiniProgram } from 'universal-env';
import * as SwiperWeb from './web';
import * as SwiperMiniapp from './miniapp';
import { TSwiper, TSwiperSlide } from './types';

let Swiper: TSwiper;
let SwiperSlide: TSwiperSlide;

if (isWeb) {
  Swiper = SwiperWeb.Swiper;
  SwiperSlide = SwiperWeb.SwiperSlide;
} else if (isMiniApp || isWeChatMiniProgram || isByteDanceMicroApp || isBaiduSmartProgram || isKuaiShouMiniProgram) {
  Swiper = SwiperMiniapp.Swiper;
  SwiperSlide = SwiperMiniapp.SwiperSlide;
} else {
  Swiper = SwiperWeb.Swiper;
  SwiperSlide = SwiperWeb.SwiperSlide;
}

export {
  Swiper,
  SwiperSlide
};

export * from './types';


