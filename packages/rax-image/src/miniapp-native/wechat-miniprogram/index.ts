import fmtEvent from './fmtEvent';

Component({
  data: {
    style: ''
  },
  properties: {
    className: {
      type: String,
      value: ''
    },
    styleSheet: {
      type: String,
      value: ''
    },
    mode: {
      type: String,
      value: 'scaleToFill'
    },
    source: {
      type: Object,
      value: {
        uri: ''
      }
    },
    lazyLoad: {
      type: Boolean,
      value: false
    },
    loading: {
      type: String,
      value: 'eager'
    },
    webp: {
      type: Boolean,
      value: false
    }
  },
  lifetimes: {
    attached: function() {
      this.initImage();
    }
  },
  observers: {
    styleSheet(newStyleSheet) {
      this.initImage('styleSheet', newStyleSheet);
    },
    source(newSource) {
      this.initImage('source', newSource);
    }
  },
  options: {
    styleIsolation: 'apply-shared'
  },
  methods: {
    onError(e) {
      const event = fmtEvent(this.properties, e);
      this.triggerEvent('onError', event.detail);
    },
    onLoad(e) {
      const event = fmtEvent(this.properties, e);
      this.triggerEvent('onLoad', event.detail);
    },
    onTap(e) {
      const event = fmtEvent(this.properties, e);
      this.triggerEvent('onClick', event.detail);
    },
    initImage(type, newValue) {
      const { width = null, height = null } = (type === 'source' ? newValue : this.properties.source) || {};
      let style = type === 'styleSheet' ? newValue : this.properties.styleSheet || '';
      if (width) style += 'width:' + width + 'rpx;';
      if (height) style += 'height:' + height + 'rpx;';

      this.setData({
        style
      });
    }
  }
});
