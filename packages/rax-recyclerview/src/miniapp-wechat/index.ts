import fmtEvent from "./fmtEvent";

Component({
  properties: {
    className: {
      type: String,
      value: ""
    },
    styleSheet: {
      type: String,
      value: ""
    },
    endReachedThreshold: {
      type: Number,
      value: 500
    }
  },
  options: {
    styleIsolation: 'apply-shared',
  },
  methods: {
    onEndReached(e) {
      const event = fmtEvent(this.properties, e);
      this.triggerEvent('onEndReached', event);
    },
    onScroll(e) {
      const event = fmtEvent(this.properties, e);
      this.triggerEvent('onEndReached', event);
    }
  }
});
