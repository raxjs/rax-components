Component({
  data: {
    url: '',
  },
  properties: {
    src: {
      type: String,
      value: ''
    },
    urlParam: {
      type: String,
      optionalTypes: [Object]
    }
  },
  methods: {
    onMessage(e) {
      this.triggerEvent('onMessage', e.detail);
    }
  }
});
