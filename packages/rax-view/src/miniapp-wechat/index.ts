import fmtEvent from './fmtEvent';

Component({
  data: {},
  properties: {
    className: {
      type: String,
      value: ''
    },
    styleSheet: {
      type: String,
      value: ''
    },
    defaultStyle: {
      type: String,
      value: 'border:0 solid black;display:flex;flex-direction:column;align-content:flex-start;flex-shrink:0;box-sizing:border-box;'
    },
    animation: {
      type: Object,
      value: null
    }
  },
  methods: {
    onClick(e) {
      const event = fmtEvent(this.props, e);
      this.triggerEvent('onClick', event);
    },
    onLongPress(e) {
      const event = fmtEvent(this.props, e);
      this.triggerEvent('onLongPress', event);
    },
    onTouchStart(e) {
      const event = fmtEvent(this.props, e);
      this.triggerEvent('onTouchStart', event);
    },
    onTouchMove(e) {
      const event = fmtEvent(this.props, e);
      this.triggerEvent('onTouchMove', event);
    },
    onTouchEnd(e) {
      const event = fmtEvent(this.props, e);
      this.triggerEvent('onTouchEnd', event);
    },
    onTouchCancel(e) {
      const event = fmtEvent(this.props, e);
      this.triggerEvent('onTouchCancel', event);
    }
  }
});
