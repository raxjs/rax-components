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
    id: {
      type: String,
      value: ''
    },
    width: {
      type: Number,
      value: 0
    },
    height: {
      type: Number,
      value: 0
    }
  },
  options: {
    styleIsolation: 'apply-shared'
  },
  methods: {
    onClick(e) {
      const event = fmtEvent(this.properties, e);
      this.triggerEvent('onClick', event);
    },
    onLongpress(e) {
      const event = fmtEvent(this.properties, e);
      this.triggerEvent('onLongpress', event);
    },
    onTouchStart(e) {
      const event = fmtEvent(this.properties, e);
      this.triggerEvent('onTouchStart', event);
    },
    onTouchMove(e) {
      const event = fmtEvent(this.properties, e);
      this.triggerEvent('onTouchMove', event);
    },
    onTouchEnd(e) {
      const event = fmtEvent(this.properties, e);
      this.triggerEvent('onTouchEnd', event);
    },
    onTouchCancel(e) {
      const event = fmtEvent(this.properties, e);
      this.triggerEvent('onTouchCancel', event);
    }
  }
});
