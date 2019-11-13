import fmtEvent from './fmtEvent';

const noop = () => {};
Component({
  data: {},
  props: {
    src: '',
    controls: true,
    autoPlay: false,
    loop: false,
    style: '',
    className: '',
    onClick: noop,
    onEnded: noop,
    muted: false,
    id: ''
  },
  methods: {
    onClick(e) {
      const event = fmtEvent(this.props, e);
      this.props.onClick(event);
    },
    onEnded(e) {
      const event = fmtEvent(this.props, e);
      this.props.onEnded(event);
    }
  },
});
