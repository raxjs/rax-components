import {
  createElement,
  useRef,
  useEffect,
  forwardRef,
  ForwardRefExoticComponent,
  useImperativeHandle
} from 'rax';
import { isWeex } from 'universal-env';
import cx from 'classnames/dedupe';
import omit from 'omit.js';
import { VideoProps } from './types';

const Video: ForwardRefExoticComponent<VideoProps> = forwardRef(
  (props, ref) => {
    const { className, style, controls, playControl, autoPlay } = props;
    const refEl = useRef(null);
    useImperativeHandle(ref, () => refEl.current);
    const common = omit(props, ['className', 'controls', 'style', 'playControl']);
    // Default controls is true
    if (controls == undefined || controls === true) {
      common.controls = true;
    } else {
      common.controls = isWeex ? 'nocontrols' : false;
    }
    common.autoPlay = playControl === 'play' || autoPlay;
    useEffect(() => {
      if (!isWeex) {
        const node = refEl.current;
        if (playControl !== undefined) {
          playControl === 'play' ? node.play() : node.pause();
        }
      }
    }, [playControl]);
    return isWeex ? (
      <video
        {...common}
        ref={refEl}
        className={cx('rax-video', className)}
        style={style}
        playStatus={playControl}
      />
    ) : (
      <video
        {...common}
        ref={refEl}
        className={cx('rax-video', className)}
        style={style}
        webkit-playsinline
        playsinline
      >
        <source src={props.src} />
      </video>
    );
  }
);
Video.displayName = 'Video';
export default Video;
