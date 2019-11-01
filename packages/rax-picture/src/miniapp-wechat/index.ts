import fmtEvent from './fmtEvent';

Component({
  properties: {
    className: {
      type: String,
      value: ''
    },
    styleSheet: {
      type: String,
      value: ''
    },
    source: {
      type: Object,
      value: {
        uri: ''
      }
    },
    resizeMode: {
      type: String,
      value: 'contain'
    },
    lazyload: {
      type: Boolean,
      value: false
    },
  },
  options: {
    styleIsolation: 'apply-shared',
  },
  methods: {
    onClick(e) {
      const event = fmtEvent(this.properties, e);
      this.triggerEvent('onClick', event);
    },
    onLoad(e) {
      const event = fmtEvent(this.properties, e);
      this.triggerEvent('onLoad', event);
    },
    onError(e) {
      const event = fmtEvent(this.properties, e);
      this.triggerEvent('onError', event);
    }
  }
});
