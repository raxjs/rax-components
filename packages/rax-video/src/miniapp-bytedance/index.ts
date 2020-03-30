import fmtEvent from './fmtEvent';

const noop = () => {};
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
