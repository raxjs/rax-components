import { createElement, useState, useCallback, forwardRef, ForwardRefExoticComponent } from 'rax';
import { isWeex, isMiniApp, isWeChatMiniProgram, isWeb, isByteDanceMicroApp } from 'universal-env';
import { ImageProps, Source, ImageLoadEvent, ImageNativeProps } from './types';

const EMPTY_SOURCE = {} as any as Source;

interface ErrorState {
  uri?: string;
}

const Image: ForwardRefExoticComponent<ImageProps> = forwardRef(({
  source,
  fallbackSource,
  onLoad,
  onError,
  style,
  resizeMode,
  loading,
  ...otherProps
}: ImageProps, ref) => {
  source = source || EMPTY_SOURCE;
  fallbackSource = fallbackSource || EMPTY_SOURCE;
  const nativeProps: ImageNativeProps = otherProps as any;
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
      if (isMiniApp || isWeChatMiniProgram) {
        onLoad && onLoad(e);
      } else if (e && e.success) {
        // weex
        onLoad && onLoad(e);
      } else if (
        e &&
        e.currentTarget &&
        e.currentTarget.naturalWidth > 1 &&
        e.currentTarget.naturalHeight > 1
      ) {
        // web
        onLoad && onLoad(e);
      } else {
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
    if (isWeb) {
      nativeProps.loading = loading;
    } else if (isMiniApp || isWeChatMiniProgram || isByteDanceMicroApp) {
      nativeProps['lazy-load'] = loading === 'lazy';
    }
  }

  // for cover and contain
  resizeMode = resizeMode || nativeProps.style.resizeMode;
  if (resizeMode) {
    if (isWeex) {
      nativeProps.resize = resizeMode;
      nativeProps.style.resizeMode = resizeMode;
    } else {
      nativeProps.style.objectFit = resizeMode as any;
    }
  }

  // Set default quality to "original" in weex avoid image be optimized unexpect
  if (isWeex) {
    return <image quality="original" {...nativeProps} ref={ref} />;
  }

  return <img {...nativeProps} ref={ref} />;
});

export default Image;
