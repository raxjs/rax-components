import fmtEvent from './fmtEvent';

const noop = () => {};

console.warn('组件所依赖的 rax-video 版本较旧，请尽快重新构建发布该组件');
Component({
  data: {},
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
