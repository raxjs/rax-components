import {
  createElement,
  useState,
  forwardRef,
  useRef,
  useEffect,
  ForwardRefExoticComponent
} from 'rax';
import { isWeex } from 'universal-env';
import { ImageProps, Source, ImageLoadEvent } from './types';

const Image: ForwardRefExoticComponent<ImageProps> = forwardRef(
  (props, ref) => {
    const [source, setSource] = useState<Source>(props.source);
    const isInitialMount = useRef(false);

    const onError = (e: ImageLoadEvent) => {
      const { fallbackSource, onError = () => {} } = props;
      if (
        fallbackSource &&
        fallbackSource.uri &&
        source.uri !== fallbackSource.uri
      ) {
        setSource(fallbackSource);
      }
      onError(e);
    };

    const onLoad = (e: ImageLoadEvent) => {
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
    };

    useEffect(() => {
      if (!isInitialMount.current) {
        isInitialMount.current = true;
      } else {
        setSource(props.source);
      }
    }, [props.source.uri]);

    const nativeProps = {
      ...props
    };

    // Source must a object
    if (source && source.uri) {
      const { style = {} } = nativeProps;
      let { width, height, uri } = source;
      nativeProps.style = {
        width,
        height,
        ...style
      };
      nativeProps.src = uri;
      nativeProps.onLoad = onLoad;
      nativeProps.onError = onError;

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

      const {
        className,
        children,
        style: nativeStyle,
        ...otherProps
      } = nativeProps;
      const cls = ['rax-image', className].join(' ');
      return isWeex ? (
        <image ref={ref} className={cls} style={nativeStyle} {...otherProps} />
      ) : (
        <img ref={ref} className={cls} style={nativeStyle} {...otherProps} />
      );
    }
    return null;
  }
);

export default Image;
