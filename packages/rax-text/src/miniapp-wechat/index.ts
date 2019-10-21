import fmtEvent from './fmtEvent';

Component({
  data: {},
  properties: {
    className: {
      type: String,
      value: ''
    },
    style: {
      type: String,
      value: ''
    },
    numberOfLines: {
      type: Number,
      value: 0
    },
    onClick: {
      type: Function,
      value: function onClick() {
      }
    }
  },
  lifetimes: {
    attached: function() {
    },
    detached: function() {
    },
  },
  options: {
    styleIsolation: 'apply-shared'
  },
  methods: {
    onClick: function onClick(e) {
      var event = fmtEvent(this.props, e);
      this.triggerEvent('onClick', event);
    }
  }
});
