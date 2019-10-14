import fmtEvent from './fmtEvent';

const startPoint = {
  x: 0,
  y: 0
};
let isHorizontal = true;
let touchMoveStarted = false;

Component({
  data: {},
  props: {
    style: '',
    onVerticalPan: () => {},
    onHorizontalPan: () => {}
  },
  didMount: function didMount() {},
  methods: {
    onTouchStart(e) {
      var event = fmtEvent(this.props, e);
      startPoint.x = event.changedTouches[0].pageX;
      startPoint.y = event.changedTouches[0].pageY;
    },
    onTouchMove(e) {
      var event = fmtEvent(this.props, e);
      if (!touchMoveStarted) {
        const touchMoveStartPoint = {
          x: event.changedTouches[0].pageX,
          y: event.changedTouches[0].pageY
        };
        touchMoveStarted = true;

        if (Math.abs(startPoint.x - touchMoveStartPoint.x) < 20) {
          isHorizontal = false;
        } else {
          isHorizontal = true;
        }

        if (isHorizontal) {
          event.state = 'onHorizontalPan:start';
          this.props.onHorizontalPan(event);
        } else {
          event.state = 'onVeriticalPan:start';
          this.props.onVerticalPan(event);
        }
      }

      if (isHorizontal) {
        event.state = 'onHorizontalPan:move';
        this.props.onHorizontalPan(event);
      } else {
        event.state = 'onVeriticalPan:move';
        this.props.onVerticalPan(event);
      }
    },
    onTouchEnd(e) {
      touchMoveStarted = false;
      var event = fmtEvent(this.props, e);

      if (isHorizontal) {
        event.state = 'onHorizontalPan:end';
        this.props.onHorizontalPan(event);
      } else {
        event.state = 'onVeriticalPan:end';
        this.props.onVerticalPan(event);
      }
    }
  }
});