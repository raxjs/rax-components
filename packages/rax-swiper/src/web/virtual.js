import cloneElement from 'rax-clone-element';

function updateOnVirtualData(swiper) {
  if (!swiper || swiper.destroyed) return;
  swiper.updateSlides();
  swiper.updateProgress();
  swiper.updateSlidesClasses();
  if (swiper.lazy && swiper.params.lazy.enabled) {
    swiper.lazy.load();
  }
}

function renderVirtual(swiper, slides, virtualData) {
  if (!virtualData) return null;
  const style = swiper.isHorizontal()
    ? {
      [swiper.rtlTranslate ? 'right' : 'left']: `${virtualData.offset}px`,
    }
    : {
      top: `${virtualData.offset}px`,
    };
  return slides
    .filter((child, index) => index >= virtualData.from && index <= virtualData.to)
    .map((child) => {
      return cloneElement(child, {
        swiper,
        style,
      });
    });
}

export { renderVirtual, updateOnVirtualData };
