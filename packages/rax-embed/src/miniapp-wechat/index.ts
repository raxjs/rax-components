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
    },
    id: {
      type: String,
      value: ''
    }
  },
  methods: {
    onMessage(e) {
      this.triggerEvent('onMessage', e.detail);
    }
  }
});
