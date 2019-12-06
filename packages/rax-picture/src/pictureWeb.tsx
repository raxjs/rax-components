import {
  createElement,
  useState,
  memo,
  forwardRef,
  ForwardRefExoticComponent,
  useRef,
  MutableRefObject,
  useImperativeHandle
} from 'rax';
import View from 'rax-view';
import Image from 'rax-image';
import optimizer from './optimizer/index';
import { isSupport } from './webp';
import { PictureProps } from './types';

let isSupportJPG = false;
let isSupportPNG = false;

isSupport(_isSupportJPG => {
  isSupportJPG = _isSupportJPG;
});

isSupport(_isSupportPNG => {
  isSupportPNG = _isSupportPNG;
}, 'alpha');

/**
 * @param  {String|[String]} suffix
 * @return {[String]}        [description]
 */
function parseSuffix(suffix: string | string[]): string[] {
  const result: string[] = [];
  let ret: string[] = [];

  if (typeof suffix === 'string') {
    ret = suffix.split(',');
  }

  if (Array.isArray(suffix)) {
    ret = suffix;
  }

  if (ret && ret[0]) {
    result[0] = ret[0];
  }
  if (ret && ret[1]) {
    result[1] = ret[1];
  }

  return result;
}

/**
 * @param  {String|Array} suffix
 * @return {[type]}
 */
function getQualitySuffix(highQuality, suffix) {
  const _suffix = parseSuffix(suffix);
  return highQuality ? _suffix[0] : _suffix[1];
}

const Picture: ForwardRefExoticComponent<PictureProps> = forwardRef(
  (props, ref) => {
    let {
      children,
      className,
      style = {
        width: 0,
        height: 0
      },
      resizeMode,
      width,
      height,
      placeholder = 'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==',
      source = {
        uri: ''
      },
      autoRemoveScheme = true,
      autoReplaceDomain = true,
      autoScaling = true,
      autoWebp = true,
      ignoreGif = true,
      autoCompress = true,
      highQuality = true,
      compressSuffix = ['Q75', 'Q50'],
      defaultHeight = '750rem',
      lazyload = false,
      autoPixelRatio = true,
      downgradeScale = 0,
      qualitySuffix = ''
    } = props;
    const [visible, setVisible] = useState(false);
    const domRef = useRef<HTMLImageElement | HTMLDivElement>(null);
    useImperativeHandle(ref, () => domRef.current);
    let { uri } = source;
    let nativeProps = {
      ...props
    };
    let sWidth = style.width, // style width of picture
      sHeight = style.height; // style width of picture

    let scalingWidth = 0;
    downgradeScale = parseFloat(downgradeScale + '');
    if (downgradeScale > 0 && downgradeScale < 1) {
      scalingWidth = downgradeScale * parseFloat(sWidth + '');
      autoScaling = false;
    }
    if (qualitySuffix) {
      autoCompress = false;
    }
    // according to the original height and width of the picture
    if (!sHeight && sWidth && width && height) {
      const pScaling =
        width / parseFloat(sWidth + '');
      sHeight = parseFloat(height / pScaling + '');
    }

    let newStyle = Object.assign(
      {
        height: sHeight
      },
      style
    );

    if (uri) {
      if (autoPixelRatio && window.devicePixelRatio > 1) {
        // devicePixelRatio >= 2 for web
        if (typeof sWidth === 'string' && sWidth.indexOf('rem') > -1) {
          sWidth = parseFloat(sWidth.split('rem')[0]) * 2 + 'rem';
        }
      }
      uri = optimizer(uri, {
        ignoreGif: ignoreGif,
        ignorePng: true,
        removeScheme: autoRemoveScheme,
        replaceDomain: autoReplaceDomain,
        scalingWidth: autoScaling ? sWidth : scalingWidth,
        webp: autoWebp && (isSupportJPG && isSupportPNG),
        compressSuffix: autoCompress
          ? getQualitySuffix(highQuality, compressSuffix)
          : ''
      });
    }

    if (resizeMode) {
      newStyle.resizeMode = resizeMode;
    }

    let url = placeholder;
    if (
      window.__isHydrating ||
      window.__isSSR ||
      props.isHydrating ||
      props.isSSR
    ) {
      lazyload = false;
    }
    if (lazyload) {
      nativeProps.onAppear = () => setVisible(true);
      if (visible) {
        url = uri;
      }
    } else {
      url = uri;
    }

    if (children) {
      return (
        <View
          {...nativeProps}
          ref={domRef as MutableRefObject<HTMLDivElement>}
          className={className}
          style={{
            ...newStyle,
            backgroundImage: 'url(' + url + ')',
            backgroundSize: resizeMode || 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:
              resizeMode === 'cover' || resizeMode === 'contain'
                ? 'center'
                : null,
            height: newStyle.height ? newStyle.height : defaultHeight
          }}
          data-once={true}
        >
          {children}
        </View>
      );
    } else {
      return (
        <Image
          {...nativeProps}
          ref={domRef as MutableRefObject<HTMLImageElement>}
          className={className}
          style={newStyle}
          data-once={true}
          source={{
            uri: url
          }}
        />
      );
    }
  }
);
Picture.displayName = 'Picture';

function shouldComponentUpdate(preProps: PictureProps) {
  return !!preProps.children;
}

export default memo(Picture, shouldComponentUpdate);
