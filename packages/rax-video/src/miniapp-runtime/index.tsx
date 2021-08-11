import {
  createElement,
  useRef,
  forwardRef,
  ForwardRefExoticComponent,
  useImperativeHandle
} from 'rax';
import cx from 'classnames/dedupe';
import omit from 'omit.js';
import wrapDefaultProperties from '../utils/wrapDefaultProperties';
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
    const { className = '', style, controls, autoPlay } = props;
    const refEl = useRef(null);
    useImperativeHandle(ref, () => refEl.current);
    const common = omit(props, ['className', 'controls', 'style', 'playControl', 'autoPlay']);
    // Default controls is true
    common.controls = controls === undefined || controls === true;
    common.autoplay = autoPlay;

    Object.keys(miniappVideoPropsMap).forEach(prop => {
      common[miniappVideoPropsMap[prop]] = common[prop];
      delete common[prop];
    });

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
export default wrapDefaultProperties(Video);
