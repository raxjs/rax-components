Component({
  data: {
  },
  props: {
    className: '',
    style: '',
    onViewAppear: '',
    onViewFirstAppear: '',
    onViewDisAppear: '',
    id: ''
  },
  didMount: function didMount() {},
  methods: {
    onAppear(e) {
      // console.log(this.props.onViewAppear)
      if (this.props.onViewAppear
        && typeof this.props.onViewAppear === 'function')
        this.props.onViewAppear(e);
    },
    onDisappear(e) {
      if (this.props.onViewDisAppear
        && typeof this.props.onViewDisAppear === 'function')
        this.props.onViewDisAppear(e);
    },
    onFirstAppear(e) {
      if (this.props.onViewFirstAppear
        && typeof this.props.onViewFirstAppear === 'function')
        this.props.onViewFirstAppear(e);
    }
  }
});