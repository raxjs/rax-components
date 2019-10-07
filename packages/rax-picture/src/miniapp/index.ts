Component({
  props: {
    className: '',
    style: '',
    source: {
      uri: ''
    },
    resizeMode: 'contain',
    lazyload: false,
    onClick: e => {},
    onLoad: e => {},
    onError: e => {}
  },
  methods: {
    onClick(e) {
      this.props.onClick(e);
    },
    onLoad(e) {
      this.props.onLoad(e);
    },
    onError(e) {
      this.props.onError(e);
    }
  }
});
