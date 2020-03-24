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
    componentId: {
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
    },
    type: {
      type: String,
      value: '2d'
    }
  },
  options: {
    styleIsolation: 'apply-shared'
  },
  methods: {
    onClick(e) {
      const event = fmtEvent(this.properties, e);
      this.triggerEvent('onClick', event.detail);
    },
    onLongpress(e) {
      const event = fmtEvent(this.properties, e);
      this.triggerEvent('onLongpress', event.detail);
    },
    onTouchStart(e) {
      const event = fmtEvent(this.properties, e);
      this.triggerEvent('onTouchStart', event.detail);
    },
    onTouchMove(e) {
      const event = fmtEvent(this.properties, e);
      this.triggerEvent('onTouchMove', event.detail);
    },
    onTouchEnd(e) {
      const event = fmtEvent(this.properties, e);
      this.triggerEvent('onTouchEnd', event.detail);
    },
    onTouchCancel(e) {
      const event = fmtEvent(this.properties, e);
      this.triggerEvent('onTouchCancel', event.detail);
    },
    getContext(type) {
      if (type && this.data.type !== type) {
        this.setData({
          type
        });
      }
      const context = wx.createCanvasContext(this.properties.componentId, this);
      Object.defineProperty(context, 'fillStyle', {
        get() {
          return context.setFillStyle;
        },
        set(value) {
          context.setFillStyle(value);
        }
      })
      return context;
    }
  }
});
