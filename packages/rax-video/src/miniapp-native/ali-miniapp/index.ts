import fmtEvent from './fmtEvent';

declare const my: any;
const randomVideoID = () => {
  return '__rax_video_' + Date.now();
};
const noop = () => {};

/**
 * supportMethods
 *
 * @see https://opendocs.alipay.com/mini/component/video
 */
const supportMethods = [
  'onPlay',
  'onPause',
  'onEnded',
  'onTimeUpdate',
  'onLoading',
  'onStop',
  'onRenderStart',
  'onError',
  'onFullScreenChange',
  'onClick',
  'onUserAction',
];

const componentProps = supportMethods.reduce((prev, current) => {
  prev[current] = noop;
  return prev;
}, {});

const componentMethods = supportMethods.reduce((prev, current) => {
  prev[current] = function(e) {
    const event = fmtEvent(this.props, e);
    this.props[current](event);
  };
  return prev;
}, {});

Component({
  data: {
    _id: ''
  },
  props: {
    src: '',
    controls: true,
    autoPlay: false,
    playControl: null,
    loop: false,
    style: '',
    className: '',
    muted: false,
    id: '',
    extraInfo: {},
    mobilenetHintType: 1,
    showMuteBtn: true,
    showPlayBtn: true,
    showFullscreenBtn: true,
    showCenterPlayBtn: true,
    showThinProgressBar: false,
    objectFit: 'contain',
    enableNative: false,
    ...componentProps,
  },
  onInit() {
    const { playControl, id } = this.props;
    const _id = id || randomVideoID();
    if (playControl) {
      this.videoContext = my.createVideoContext(_id);
      this.switchPlayStatus(playControl);
    }
    this.setData({ _id });
  },
  deriveDataFromProps(nextProps) {
    const { playControl } = nextProps;
    if (playControl !== this.props.playControl) {
      this.switchPlayStatus(playControl);
    }
  },
  didMount() {
    if (!my.canIUse('component2')) {
      const { playControl, id } = this.props;
      const _id = id || randomVideoID();
      if (playControl) {
        this.videoContext = my.createVideoContext(_id);
      }
      this.setData({ _id });
      this.switchPlayStatus(playControl);
    }
  },
  didUpdate(prevProps) {
    if (!my.canIUse('component2')) {
      const { playControl } = prevProps;
      if (playControl !== this.props.playControl) {
        this.switchPlayStatus(this.props.playControl);
      }
    }
  },
  methods: {
    ...componentMethods,
    switchPlayStatus(playControl) {
      if (playControl === 'play') {
        this.videoContext.play();
      } else if (playControl === 'pause') {
        this.videoContext.pause();
      }
    }
  },
});
