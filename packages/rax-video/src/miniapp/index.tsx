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

const miniappVideoPropsMap = {
  showMuteBtn: 'show-mute-btn',
  showPlayBtn: 'show-play-btn',
  showFullscreenBtn: 'show-fullscreen-btn',
  showCenterPlayBtn: 'show-center-play-btn',
  showThinProgressBar: 'show-thin-progress-bar',
  objectFit: 'object-fit'
};

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
      common.controls = false;
    }
    common.autoplay = playControl === 'play' || autoPlay;
    delete common.autoPlay;

    Object.keys(miniappVideoPropsMap).forEach(prop => {
      common[miniappVideoPropsMap[prop]] = common[prop];
      delete common[prop];
    });

    useEffect(() => {
      const node = refEl.current;
      if (playControl !== undefined) {
        playControl === 'play' ? node.play() : node.pause();
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
