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
import wrapDefaultProperties from '../utils/wrapDefaultProperties';
import { VideoProps } from '../types';
import { createVideoContext } from '@uni/video';

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
    const { id, className = '', style, controls, playControl, autoPlay } = props;
    const refEl = useRef(null);
    useImperativeHandle(ref, () => refEl.current);
    const common = omit(props, ['className', 'controls', 'style', 'playControl', 'autoPlay']);
    // Default controls is true
    common.controls = controls === undefined || controls === true;
    common.autoplay = playControl === 'play' || autoPlay;

    Object.keys(miniappVideoPropsMap).forEach(prop => {
      common[miniappVideoPropsMap[prop]] = common[prop];
      delete common[prop];
    });

    useEffect(() => {
      if (playControl !== undefined) {
        if (!id) {
          console.warn('id is required if using playControl in miniapp!');
          return undefined;
        }
        const cacheVideoContext = () => {
          refEl.current = createVideoContext(id);
          window.removeEventListener('setDataFinished', cacheVideoContext);
        };
        window.addEventListener('setDataFinished', cacheVideoContext);
      }
    }, []);

    useEffect(() => {
      if (playControl !== undefined && refEl.current) {
        playControl === 'play' ? refEl.current.play() : refEl.current.pause();
      }
    }, [playControl]);

    return (
      <video
        {...common}
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
