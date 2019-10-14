import {
  HTMLAttributes,
  RefAttributes,
  CSSProperties,
  SyntheticEvent
} from 'rax';

export interface Source {
  uri: string;
  width?: string | number;
  height?: string | number;
}

/**
 * props of components
 */
export interface ImageProps
  extends HTMLAttributes<HTMLImageElement>,
  RefAttributes<HTMLImageElement> {
  /**
   * source: set image uri
   * support: Weex/Web
   */
  source: Source;
  /**
   * width: must for weex
   * support: Weex/Web
   */
  width?: string | number;
  /**
   * height: must for weex
   * support: Weex/Web
   */
  height?: string | number;
  /**
   * style: style of image
   * support: Weex/Web
   */
  style?: CSSProperties;
  /**
   * fallbackSource: load fallback image when source image load failed
   * support: Weex/Web
   */
  fallbackSource?: Source;
  /**
   * resizeMode: decide how to resize the image when the component size and picture size are out of proportion
   * support: Weex/Web
   */
  resizeMode?: 'contain' | 'cover' | 'stretch' | 'center' | 'repeat';
  /**
   * quality: quality of image
   * support: Weex
   */
  quality?: 'original' | 'normal' | 'low' | 'high' | 'auto';
  /**
   * callback of success
   */
  onLoad?: (e: ImageLoadEvent) => void;
  /**
   * callback of failure
   */
  onError?: (e: ImageLoadEvent) => void;
}

export interface ImageLoadEvent extends SyntheticEvent<HTMLImageElement> {
  success?: string;
}
