import fmtEvent from './fmtEvent';

declare const tt: any;
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
    id: {
      type: String,
      value: ''
    },
    poster: {
      type: String,
      value: ''
    },
    playControl: {
      type: String,
      value: 'pause',
      observer: function(newVal, oldVal) {
        if (!(newVal === 'pause' || newVal === 'play')) {
          return;
        }
        const videoIns = tt.createVideoContext(this.data._id);
        if (newVal === 'pause') {
          videoIns.pause();
        }
        if (newVal === 'play') {
          videoIns.play();
        }
      }
    }
  },
  options: {
    styleIsolation: 'apply-shared',
  },
  attached() {
    this.setData({
      _id: this.data.id || randomVideoID()
    });
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
  },
});
