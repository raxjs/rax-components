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
  placeholder,
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
      // onLoad is triggered by native, so no need to judge
      onLoad && onLoad(e);
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
    nativeProps['lazy-load'] = loading === 'lazy';
  }
  if (placeholder) {
    nativeProps['default-source'] = placeholder;
  }

  // for cover and contain
  resizeMode = resizeMode || nativeProps.style.resizeMode;
  if (resizeMode) {
    nativeProps.style.objectFit = resizeMode as any;
  }

  return <img {...nativeProps} ref={ref} />;
});

export default Image;
