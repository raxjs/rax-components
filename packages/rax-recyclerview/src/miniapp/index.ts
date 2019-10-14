import fmtEvent from './fmtEvent';

Component({
  props: {
    className: '',
    style: '',
    horizontal: false,
    endReachedThreshold: 500,
    onEndReached: function onEndReached() {},
    onScroll: function onScroll() {}
  },
  methods: {
    onEndReached: function onEndReached(e) {
      var event = fmtEvent(this.props, e);
      this.props.onEndReached(event);
    },
    onScroll: function onScroll(e) {
      var event = fmtEvent(this.props, e);
      this.props.onScroll(event);
    }
  }
});