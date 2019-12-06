import { RefAttributes, HTMLAttributes, CSSProperties } from "rax";
import { WidthProperty, HeightProperty } from "csstype";

declare global {
  interface Window {
    [key: string]: any;
  }
  type $TSFixMe = any;
}
/**
 * component:picture(图片)
 * document address(文档地址):
 * https://alibaba.github.io/rax/component/picture
 */

/**
 * resizeMode available values (可用值)：
 *
 * cover: the image is scaled while maintaining the aspect ratio of the image until the width and height are greater than or equal to
 * the size of the container view (if the container has a padding line, subtract it accordingly. Only Android works).
 * Annotation: This image completely covers or even exceeds the container, leaving no space in the container.
 *
 * contain: scale the image to maintain the aspect ratio of the image until both the width and height are less than or equal to the size of the container view
 * (if the container has a padding liner, subtract it accordingly. Only Android works). Annotation: This image is completely wrapped in the container, the container may leave blank
 *
 *  stretch:stretch the picture without maintaining the aspect ratio until the height is just enough to fill the container.
 */
export type PictureResizeMode = "cover" | "contain" | "stretch";

export interface PictureProps
  extends RefAttributes<HTMLImageElement>,
    Omit<HTMLAttributes<HTMLImageElement>, "style"> {
  style: Omit<CSSProperties, "width" | "height"> & {
    width: WidthProperty<number>;
    height: HeightProperty<number>;
  };
  /**
   * image source
   */
  source: {
    uri: string;
    height?: number;
    width?: number;
  };
  /**
   * decide how to adjust the size of the picture when the component size and picture size are out of proportion
   * default: stretch
   */
  resizeMode?: PictureResizeMode;

  /**
   * picture is a PureComponent whose shouldComponentUpdate determines if and only if porps.source.uri changes. If you want to ignore its shouldComponentUpdate, pass in forceUpdate={true}
   *  default: false
   */
  forceUpdate?: boolean;

  /**
   * real width of picture, unit px
   */
  width?: number;

  /**
   * real height of picture, unit px
   */
  height?: number;

  /**
   * (web-side valid) The web side needs to import the framework.web.js script,
   * depending on whether the image is lazily loaded within the visible range.
   * default: false
   */
  lazyload?: boolean;

  /**
   * (web side valid) Use double image at high resolution
   * default: true
   */
  autoPixelRatio?: boolean;

  /**
   * the URL of the background image displayed when lazyload is enabled on the web side cannot be set at the same time with an unexpected effect.
   */
  placeholder?: string;

  /**
   * (web side is valid) image URL auto-delete protocol header
   * default: true
   */
  autoRemoveScheme?: boolean;

  /**
   * (web side is valid) image URL domain is replaced with gw.alicdn.com
   * default: true
   */
  autoReplaceDomain?: boolean;

  /**
   * (Web side is valid) Adding scaling suffix for image URL will add scaling suffix according to width property in style
   *default: true
   */
  autoScaling?: boolean;

  /**
   * (web side is valid) Add webp suffix
   *default: true
   */
  autoWebp?: boolean;

  /**
   * (web side is valid) Add mass compression suffix
   * default: true
   */
  autoCompress?: boolean;

  /**
   * (web side effective) Image quality compression suffix rule
   * default: ['q75', 'q50']
   */
  compressSuffix?: string[];

  /**
   * (Web side is valid) Use high quality compressed suffix
   * default: true
   */
  highQuality?: boolean;

  /**
   * (web side is valid) Whether the optimization of all URLs ignores images in gif format and ignores them by default
   * default: true
   */
  ignoreGif?: boolean;
}
