import {
  createElement,
  useRef,
  useEffect,
  forwardRef,
  ForwardRefExoticComponent,
  useImperativeHandle
} from 'rax';

import cx from 'classnames/dedupe';
import omit from 'omit.js';
import wrapper from '../utils/wrapper';
import { VideoProps } from '../types';

const Video: ForwardRefExoticComponent<VideoProps> = forwardRef(
  (props, ref) => {
    const { className, style, controls, playControl, autoPlay, onPlayError } = props;
    const refEl = useRef(null);
    useImperativeHandle(ref, () => refEl.current);
    const common = omit(props, ['className', 'controls', 'style', 'playControl']);
    // Default controls is true
    if (controls == undefined || controls === true) {
      common.controls = true;
    } else {
      common.controls = false;
    }
    common.autoPlay = playControl === 'play' || autoPlay;
    if (common.autoPlay === false) {
      delete common.autoPlay; // In W3C standard, if the attribute is set, it will be treated as true regardless of its value
    }

    useEffect(() => {
      const node = refEl.current;
      if (playControl !== undefined) {
        if (playControl === 'play') {
          const playPromise = node.play();
          if (playPromise !== undefined) {
            playPromise.catch(error => {
              onPlayError(error);
            });
          }
        } else {
          node.pause();
        }
      }
    }, [playControl]);
    return (
      <video
        {...common}
        ref={refEl}
        className={cx('rax-video', className)}
        style={style}
        webkit-playsinline
        playsinline
        src={props.src}
      />
    );
  }
);
export default wrapper(Video);
