import fmtEvent from './fmtEvent';

Component({
  data: {},
  props: {
    className: '',
    style: '',
    width: '',
    height: '',
    autoPlay: false,
    showsPagination: false,
    loop: false,
    index: 0,
    interval: 1000,
    onChange: function onChange() {},
  },
  didMount: function didMount() {},
  methods: {
    onChange(e) {
      var event = fmtEvent(this.props, e);
      this.props.onChange(event);
    }
  }
});