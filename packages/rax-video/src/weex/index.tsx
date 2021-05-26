import {
  createElement,
  useRef,
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
    const { className, style, controls, playControl, autoPlay } = props;
    const refEl = useRef(null);
    useImperativeHandle(ref, () => refEl.current);
    const common = omit(props, ['className', 'controls', 'style', 'playControl']);
    // Default controls is true
    if (controls == undefined || controls === true) {
      common.controls = true;
    } else {
      common.controls = 'nocontrols';
    }
    common.autoPlay = playControl === 'play' || autoPlay;

    return (
      <video
        {...common}
        ref={refEl}
        className={cx('rax-video', className)}
        style={style}
        playStatus={playControl}
      />
    );
  }
);

export default wrapper(Video);

