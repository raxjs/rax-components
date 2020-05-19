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

const updateData = (instance, props) => {
  if (props.delay) {
    setTimeout(() => {
      triggleVisible(instance, props);
    }, props.delay);
  } else {
    triggleVisible(instance, props);
  }
  const maskStyleState = computeStyle(props.maskStyle);
  const contentStyleState = computeStyle(props.contentStyle);
  instance.setData({
    maskStyleState: maskStyleState,
    contentStyleState: contentStyleState
  });
};

Component({
  data: {
    visibility: false,
    maskStyleState: '',
    contentStyleState: ''
  },
  props: {
    visible: false,
    maskStyle: {},
    contentStyle: {},
    onShow: noop,
    onHide: noop,
    maskCanBeClick: true,
    delay: 0,
    duration: 300,
    onMaskClick: noop
  },
  didUpdate() {
    // eslint-disable-next-line no-undef
    if (!my.canIUse('component2')) {
      updateData(this, this.props);
    }
  },
  deriveDataFromProps(nextProps) {
    updateData(this, nextProps);
  },
  onClick() {
    const { maskCanBeClick, onHide, onMaskClick } = this.props;
    if (typeof onMaskClick === 'function' && onMaskClick !== noop) {
      onMaskClick();
    } else if (maskCanBeClick) {
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
