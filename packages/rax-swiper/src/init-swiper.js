// eslint-disable-next-line
import Swiper, { Autoplay, Pagination } from 'swiper';
import { needsNavigation, needsPagination, needsScrollbar } from './utils';

import 'swiper/swiper.less';
import 'swiper/components/pagination/pagination.less';

Swiper.use([Autoplay, Pagination]);
function initSwiper({ el, nextEl, prevEl, paginationEl, scrollbarEl }, swiperParams) {
  if (needsNavigation(swiperParams) && nextEl && prevEl) {
    if (swiperParams.navigation === true) {
      swiperParams.navigation = {};
    }
    swiperParams.navigation.nextEl = nextEl;
    swiperParams.navigation.prevEl = prevEl;
  }
  if (needsPagination(swiperParams) && paginationEl) {
    if (swiperParams.pagination === true) {
      swiperParams.pagination = {};
    }
    swiperParams.pagination.el = paginationEl;
  }
  if (needsScrollbar(swiperParams) && scrollbarEl) {
    if (swiperParams.scrollbar === true) {
      swiperParams.scrollbar = {};
    }
    swiperParams.scrollbar.el = scrollbarEl;
  }
  return new Swiper(el, swiperParams);
}

export { initSwiper };
