Component({
  data: {},
  props: {
    src: '',
    onMessage: () => {}
  },
  didMount() {},
  methods: {
    onMessage(e) {
      this.props.onMessage(e);
    }
  }
});
