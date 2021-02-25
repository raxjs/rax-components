import {
  createElement,
  useRef,
  useEffect,
  forwardRef,
  ForwardRefExoticComponent,
  useImperativeHandle
} from 'rax';
import { isWeex, isWeb, isMiniApp, isWeChatMiniProgram } from 'universal-env';
import cx from 'classnames/dedupe';
import omit from 'omit.js';
import { VideoProps } from './types';

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
      common.controls = isWeex ? 'nocontrols' : false;
    }
    common.autoPlay = playControl === 'play' || autoPlay;
    if (isWeb && common.autoPlay === false) {
      delete common.autoPlay; // In W3C standard, if the attribute is set, it will be treated as true regardless of its value
    }
    if (isWeChatMiniProgram || isMiniApp) {
      common.autoplay = common.autoPlay;
      delete common.autoPlay;

      Object.keys(miniappVideoPropsMap).forEach(prop => {
        common[miniappVideoPropsMap[prop]] = common[prop];
        delete common[prop];
      });
    }

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
        src={props.src}
      />
    );
  }
);
Video.displayName = 'Video';
export default Video;
