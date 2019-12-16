const UP_CASE_REG = /\B([A-Z])/g;

const triggleVisible = (instance, visible) => {
  instance.setData(
    {
      visibility: visible
    },
    () => {
      if (visible) {
        instance.triggerEvent('onShow');
      } else {
        instance.triggerEvent('onHide');
      }
    }
  );
};

const loadStyle = (instance, maskStyle, contentStyle) => {
  const mask_style = computeStyle(maskStyle);
  const content_style = computeStyle(contentStyle);
  instance.setData({
    mask_style: mask_style,
    content_style: content_style
  });
};

Component({
  data: {
    visibility: false,
    mask_style: '',
    content_style: ''
  },
  properties: {
    visible: {
      type: Boolean,
      value: false
    },
    maskStyle: {
      type: Object,
      value: {}
    },
    contentStyle: {
      type: Object,
      value: {}
    },
    maskCanBeClick: {
      type: Boolean,
      value: true
    },
    delay: {
      type: Number,
      value: 0
    },
    duration: {
      type: Number,
      value: 300
    }
  },
  options: {
    styleIsolation: 'apply-shared'
  },
  attached() {
    const { delay, visible, maskStyle, contentStyle } = this.properties;
    if (visible) {
      if (delay) {
        setTimeout(() => {
          triggleVisible(this, visible, true);
        }, delay);
      } else {
        triggleVisible(this, visible, true);
      }
      loadStyle(this, maskStyle, contentStyle);
    }
  },
  observers: {
    visible(visible) {
      if (this.properties.visible !== visible) {
        if (this.properties.delay) {
          setTimeout(() => {
            triggleVisible(this, visible);
          }, this.properties.delay);
        } else {
          triggleVisible(this, visible);
        }
      }
    },
    'maskStyle, contentStyle': function(maskStyle, contentStyle) {
      loadStyle(this, maskStyle, contentStyle);
    }
  },
  methods: {
    onClick() {
      const { maskCanBeClick } = this.properties;
      if (maskCanBeClick) {
        this.triggerEvent('onHide');
      }
    }
  }
});

function computeStyle(style) {
  let handledStyle = '';
  Object.keys(style).forEach(key => {
    handledStyle =
      handledStyle +
      `${key.replace(UP_CASE_REG, '-$1').toLowerCase()}: ${style[key]};`;
  });
  return handledStyle;
}
