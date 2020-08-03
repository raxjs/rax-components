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
    onClick: function onClick(e) {
      var event = fmtEvent(this.props, e);
      this.triggerEvent('onClick', event);
    },
    onLongPress: function onLongPress(e) {
      var event = fmtEvent(this.props, e);
      this.triggerEvent('onLongPress', event);
    },
    onTouchStart: function onTouchStart(e) {
      var event = fmtEvent(this.props, e);
      this.triggerEvent('onTouchStart', event);
    },
    onTouchMove: function onTouchMove(e) {
      var event = fmtEvent(this.props, e);
      this.triggerEvent('onTouchMove', event);
    },
    onTouchEnd: function onTouchEnd(e) {
      var event = fmtEvent(this.props, e);
      this.triggerEvent('onTouchEnd', event);
    },
    onTouchCancel: function onTouchCancel(e) {
      var event = fmtEvent(this.props, e);
      this.triggerEvent('onTouchCancel', event);
    }
  }
});