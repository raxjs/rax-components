import { createElement, forwardRef, Ref } from 'rax';
import { isWeex } from 'universal-env';
import { PictureProps } from './types';
import PicWeex from './pictureWeex';
import PicWeb from './pictureWeb';

const Picture = forwardRef((props: PictureProps, ref: Ref<HTMLImageElement>) => {
  if (isWeex) {
    return <PicWeex {...props} ref={ref} />;
  } else {
    return <PicWeb {...props} ref={ref} />;
  }
});

Picture.displayName = 'Picture';
export default Picture;
