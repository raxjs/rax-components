import fmtEvent from './fmtEvent';

declare const wx: any;
const randomVideoID = () => {
  return '__rax_video_' + Date.now();
};
const noop = () => {};
Component({
  data: {
    _id: ''
  },
  properties: {
    src: {
      type: String,
      value: '',
    },
    controls: {
      type: Boolean,
      value: true,
    },
    muted: {
      type: Boolean,
      value: false,
    },
    autoPlay: {
      type: Boolean,
      value: false,
    },
    playControl: {
      type: String,
      value: '',
      observer: function(newVal) {
        if (!(newVal === 'pause' || newVal === 'play')) {
          return;
        }
        if (this.videoContext) {
          this.switchPlayStatus(newVal);
        }
      }
    },
    loop: {
      type: Boolean,
      value: false,
    },
    onEnded: {
      type: Function,
      value: noop,
    },
    className: {
      type: String,
      value: '',
    },
    styleSheet: {
      type: String,
      value: '',
    },
    onClick: {
      type: Function,
      value: noop,
    },
    componentId: {
      type: String,
      value: ''
    },
    poster: {
      type: String,
      value: ''
    },
    showMuteBtn: {
      type: Boolean,
      value: true,
    },
    showPlayBtn: {
      type: Boolean,
      value: true,
    },
    showFullscreenBtn: {
      type: Boolean,
      value: true,
    },
    showCenterPlayBtn: {
      type: Boolean,
      value: true,
    },
    objectFit: {
      type: String,
      value: 'contain'
    }
  },
  options: {
    styleIsolation: 'apply-shared',
  },
  attached() {
    const { playControl, componentId } = this.properties;
    const _id = componentId || randomVideoID();
    if (playControl) {
      this.videoContext = wx.createVideoContext(_id);
      this.switchPlayStatus(playControl);
    }
    this.setData({ _id });
  },
  methods: {
    onClick(e) {
      const event = fmtEvent(this.properties, e);
      this.triggerEvent('onClick', event);
    },
    onEnded(e) {
      const event = fmtEvent(this.properties, e);
      this.triggerEvent('onEnded', event);
    },
    switchPlayStatus(playControl) {
      if (playControl === 'play') {
        this.videoContext.play();
      } else if (playControl === 'pause') {
        this.videoContext.pause();
      }
    }
  },
});
