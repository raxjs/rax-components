import {
  createElement,
  useState,
  useCallback
} from 'rax';
import { isWeex } from 'universal-env';
import { ImageProps, Source, ImageLoadEvent } from './types';

const Image = (props: ImageProps) => {
  const [source, setSource] = useState<Source>(props.source);

  const onError = useCallback((e: ImageLoadEvent) => {
    const { fallbackSource, onError = () => {} } = props;
    if (
      fallbackSource &&
        fallbackSource.uri &&
        source.uri !== fallbackSource.uri
    ) {
      setSource(fallbackSource);
    }
    onError(e);
  }, []);

  const onLoad = useCallback((e: ImageLoadEvent) => {
    const { onLoad = () => {} } = props;
    if (typeof e.success !== 'undefined') {
      if (e.success) {
        onLoad(e);
      } else {
        onError(e);
      }
    } else if (typeof e.currentTarget !== 'undefined') {
      if (
        e.currentTarget.naturalWidth > 1 &&
          e.currentTarget.naturalHeight > 1
      ) {
        onLoad(e);
      } else {
        onError(e);
      }
    }
  }, []);

  // Source must a object
  if (source && source.uri) {
    const { style = {} } = props;
    const { width, height, uri } = source;
    const nativeProps = {
      ...props,
      src: uri,
      onLoad,
      onError
    };

    nativeProps.style = {
      width,
      height,
      ...style
    };

    delete nativeProps.source;

    // for cover and contain
    const resizeMode = nativeProps.resizeMode || nativeProps.style.resizeMode;
    if (resizeMode) {
      if (isWeex) {
        nativeProps.resize = resizeMode;
        nativeProps.style.resizeMode = resizeMode;
      } else {
        nativeProps.style.objectFit = resizeMode;
      }
    }

    // Set default quality to "original" in weex avoid image be optimized unexpect
    return isWeex ? (
      <image quality="original" {...nativeProps} />
    ) : (
      <img {...nativeProps} />
    );
  }
  return null;
};

export default Image;
