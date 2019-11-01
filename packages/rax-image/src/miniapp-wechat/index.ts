import fmtEvent from './fmtEvent';

Component({
  data: {
    styleSheet: ''
  },
  properties: {
    className: {
      type: String,
      value: ''
    },
    style: {
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
    onError: function(e) {
      const event = fmtEvent(this.properties, e);
      this.triggerEvent('onError', event);
    },
    onLoad: function(e) {
      const event = fmtEvent(this.properties, e);
      this.triggerEvent('onLoad', event);
    },
    onTap: function(e) {
      const event = fmtEvent(this.properties, e);
      this.triggerEvent('onClick', event);
    },
    initImage: function initImage(e) {
      const { width = null, height = null } = this.properties.source || {};
      let style = this.properties.style || '';
      if (width) style += 'width:' + width + 'rpx;';
      if (height) style += 'height:' + height + 'rpx;';

      this.setData({
        styleSheet: style
      });
    }
  }
});
