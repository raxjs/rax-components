Component({
  data: {
    url: '',
  },
  props: {
    src: '',
    urlParam: '',
  },
  methods: {
    onMessage(e) {
      this.props.onMessage(e);
    },
  },
});
