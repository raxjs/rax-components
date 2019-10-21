import fmtEvent from './fmtEvent';

Component({
  data: {
    mode: 'aspectFit'
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
    lazyLoad: {
      type: Boolean,
      value: false
    },
    onClick: {
      type: Function,
      value: function onClick() {
      }
    }
  },
  onInit() {
    this.initImage();
  },
  lifetimes: {
    attached: function() {
      this.initImage();
    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  options: {
    styleIsolation: 'apply-shared'
  },
  methods: {
    onClick: function onClick(e) {
      var event = fmtEvent(this.properties, e);
      this.triggerEvent('onClick', event);
    },
    initImage: function initImage(e) {
      var mode = 'aspectFit';
      const {width = null, height = null} = this.properties.source || {};
      let style = this.properties.styleSheet || '';
      if (width) style += 'width:' + width + 'rpx;';
      if (height) style += 'height:' + height + 'rpx;';

      switch (this.properties.resizeMode) {
        case 'cover':
          mode = 'aspectFill';
          break;

        case 'contain':
          mode = 'aspectFit';
          break;

        case 'stretch':
          mode = 'scaleToFill';
          break;

        default:
          mode = 'aspectFit';
      }

      this.setData({
        mode: mode,
        style: style
      });
    }
  }
});
