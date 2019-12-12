const noop = () => {};

const triggleVisible = (instance, props) => {
  const { visible, onShow, onHide } = props;
  instance.setData(
    {
      visibility: visible
    },
    () => {
      if (visible) {
        onShow && onShow();
      } else {
        onHide && onHide();
      }
    }
  );
};

Component({
  data: {
    visibility: false,
    mask_style: '',
    content_style: ''
  },
  props: {
    visible: false,
    maskStyle: {},
    contentStyle: {},
    onShow: noop,
    onHide: noop,
    maskCanBeClick: true,
    delay: 0,
    duration: 300
  },
  deriveDataFromProps(nextProps) {
    if (nextProps.delay) {
      setTimeout(() => {
        triggleVisible(this, nextProps);
      }, nextProps.delay);
    } else {
      triggleVisible(this, nextProps);
    }
    const mask_style = computeStyle(nextProps.maskStyle);
    const content_style = computeStyle(nextProps.contentStyle);
    this.setData({
      mask_style: mask_style,
      content_style: content_style
    });
  },
  onClick() {
    const { maskCanBeClick, onHide } = this.props;
    if (maskCanBeClick) {
      onHide && onHide();
    }
  }
});

function computeStyle(style) {
  let handledStyle = '';
  Object.keys(style).forEach(key => {
    handledStyle = handledStyle + `${key}: ${style[key]};`;
  });
  return handledStyle;
}
