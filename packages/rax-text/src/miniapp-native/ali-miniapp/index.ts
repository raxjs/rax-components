import fmtEvent from './fmtEvent';

const noop = () => {};
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
