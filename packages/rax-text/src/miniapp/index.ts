import fmtEvent from './fmtEvent';

const noop = () => {};
console.warn('组件所依赖的 rax-text 版本较旧，请尽快重新构建发布该组件');
Component({
  data: {},
  props: {
    className: '',
    style: '',
    selectable: false,
    space: '',
    decode: false,
    numberOfLines: 0,
    onClick: noop,
  },
  methods: {
    onClick: function onClick(e) {
      const event = fmtEvent(this.props, e);
      this.props.onClick(event);
    },
  },
});
