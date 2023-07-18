// eslint-disable-next-line
import { Swiper, Autoplay, Pagination } from 'swiper';
import { needsNavigation, needsPagination, needsScrollbar } from './utils';

// swiper >= 8.4.4 added ./swiper-bundle.min.css in exports field,
// both support webpack 4 and 5 resolving rule.
import 'swiper/swiper-bundle.min.css';

// TODO: Support SSR in Swiper component of HyperKit
// A temporary solution to prevent swiper.js errors under SSR
document.documentElement.style = document.documentElement.style || {};

Swiper.use([Autoplay, Pagination]);
function initSwiper(swiperParams) {
  return new Swiper(swiperParams);
}

function mountSwiper({ el, nextEl, prevEl, paginationEl, scrollbarEl, swiper }, swiperParams) {
  if (needsNavigation(swiperParams) && nextEl && prevEl) {
    swiper.params.navigation.nextEl = nextEl;
    swiper.originalParams.navigation.nextEl = nextEl;
    swiper.params.navigation.prevEl = prevEl;
    swiper.originalParams.navigation.prevEl = prevEl;
  }
  if (needsPagination(swiperParams) && paginationEl) {
    swiper.params.pagination.el = paginationEl;
    swiper.originalParams.pagination.el = paginationEl;
  }
  if (needsScrollbar(swiperParams) && scrollbarEl) {
    swiper.params.scrollbar.el = scrollbarEl;
    swiper.originalParams.scrollbar.el = scrollbarEl;
  }
  swiper.init(el);
}

export { initSwiper, mountSwiper };
