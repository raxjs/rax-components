import fmtEvent from './fmtEvent';

Component({
  data: {},
  properties: {
    className: {
      type: String,
      value: ''
    },
    styleSheet: {
      type: String,
      value: ''
    },
    numberOfLines: {
      type: Number,
      value: 0
    },
  },
  methods: {
    onClick: function onClick(e) {
      const event = fmtEvent(this.props, e);
      this.props.onClick(event);
    },
  },
});
