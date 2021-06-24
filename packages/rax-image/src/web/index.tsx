import { createElement, useState, useCallback, forwardRef, ForwardRefExoticComponent } from 'rax';
import { ImageProps, ImageLoadEvent, ImageNativeProps, ErrorState } from '../types';
import EMPTY_SOURCE from '../utils/emptySource';

const Image: ForwardRefExoticComponent<ImageProps> = forwardRef(({
  source,
  fallbackSource,
  onLoad,
  onError,
  style,
  resizeMode,
  loading,
  ...rest
}: ImageProps, ref) => {
  source = source || EMPTY_SOURCE;
  fallbackSource = fallbackSource || EMPTY_SOURCE;
  const nativeProps: ImageNativeProps = rest as any;
  const [errorState, setErrorState] = useState<ErrorState>({});

  nativeProps.onError = useCallback(
    (e: ImageLoadEvent) => {
      if (errorState.uri === undefined) {
        setErrorState({
          uri: source.uri,
        });
      }
      onError && onError(e);
    },
    [source.uri, onError, errorState]
  );

  nativeProps.onLoad = useCallback(
    (e: ImageLoadEvent) => {
      if (e && e.success) {
        // weex
        onLoad && onLoad(e);
      } else if (
        // alicdn will return an 1x1 img when img is not loaded successfully
        e &&
        e.currentTarget &&
        e.currentTarget.naturalWidth > 1 &&
        e.currentTarget.naturalHeight > 1
      ) {
        // web
        onLoad && onLoad(e);
      } else {
        if (errorState.uri === undefined) {
          setErrorState({
            uri: source.uri,
          });
        }
        onError && onError(e);
      }
    },
    [onLoad, onError]
  );

  if (errorState.uri !== undefined) {
    if (errorState.uri !== source.uri) {
      errorState.uri = undefined;
    } else if (fallbackSource.uri != null) {
      source = fallbackSource;
    }
  }

  const { width, height, uri } = source;
  nativeProps.src = uri;
  nativeProps.style = {
    width,
    height,
    ...style,
  };

  if (loading) {
    nativeProps.loading = loading;
  }

  // for cover and contain
  resizeMode = resizeMode || nativeProps.style.resizeMode;
  if (resizeMode) {
    nativeProps.style.objectFit = resizeMode as any;
  }

  return <img {...nativeProps} ref={ref} />;
});

export default Image;
