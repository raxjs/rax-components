Component({
  data: {
    url: '',
  },
  props: {
    id: '',
    src: '',
    urlParam: '',
  },
  methods: {
    onMessage(e) {
      this.props.onMessage(e);
    },
  },
});
