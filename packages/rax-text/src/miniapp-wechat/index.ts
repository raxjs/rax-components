import fmtEvent from './fmtEvent';

Component({
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
    }
  },
  options: {
    styleIsolation: 'apply-shared'
  },
  methods: {
    onClick(e) {
      const event = fmtEvent(this.properties, e);
      this.triggerEvent('onClick', event);
    }
  }
});
