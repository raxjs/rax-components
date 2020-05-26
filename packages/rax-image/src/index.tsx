import { createElement, useState, useCallback } from 'rax';
import { isWeex } from 'universal-env';
import { ImageProps, Source, ImageLoadEvent, ImageNativeProps } from './types';

const EMPTY_SOURCE = {} as any as Source;

interface ErrorState {
  uri?: string;
}

function Image({
  source,
  fallbackSource,
  onLoad,
  onError,
  style,
  resizeMode,
  ...otherProps
}: ImageProps) {
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
      if (e && e.success) {
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
  return isWeex ? (
    <image quality="original" {...nativeProps} />
  ) : (
    <img {...nativeProps} />
  );
}

export default Image;
