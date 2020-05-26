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
      this.triggerEvent('onEndReached', e.detail);
    },
    onScroll(e) {
      this.triggerEvent('onScroll', e.detail);
    }
  }
});
