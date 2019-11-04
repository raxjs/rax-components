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
  },
  onInit() {
    this.initImage();
  },
  lifetimes: {
    attached: function() {
      this.initImage();
    }
  },
  options: {
    styleIsolation: 'apply-shared'
  },
  methods: {
    onError(e) {
      const event = fmtEvent(this.properties, e);
      this.triggerEvent('onError', event);
    },
    onLoad(e) {
      const event = fmtEvent(this.properties, e);
      this.triggerEvent('onLoad', event);
    },
    onTap(e) {
      const event = fmtEvent(this.properties, e);
      this.triggerEvent('onClick', event);
    },
    initImage() {
      const { width = null, height = null } = this.properties.source || {};
      let style = this.properties.styleSheet || '';
      if (width) style += 'width:' + width + 'rpx;';
      if (height) style += 'height:' + height + 'rpx;';

      this.setData({
        style
      });
    }
  }
});
