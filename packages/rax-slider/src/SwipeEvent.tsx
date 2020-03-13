import { createElement, Component } from 'rax';
import * as PropTypes from 'prop-types';
import View from 'rax-view';
import * as PanResponder from 'universal-panresponder';
import isValidSwipe from './isValidSwipe';
import { SwipeEventProps } from './types';

const directions = {
  SWIPE_UP: 'SWIPE_UP',
  SWIPE_DOWN: 'SWIPE_DOWN',
  SWIPE_LEFT: 'SWIPE_LEFT',
  SWIPE_RIGHT: 'SWIPE_RIGHT'
};

class SwipeEvent extends Component<
SwipeEventProps,
{
  swipe: any;
}
> {
  public static propTypes = {
    onSwipeBegin: PropTypes.func,
    onSwipe: PropTypes.func,
    onSwipeEnd: PropTypes.func,
    swipeDecoratorStyle: PropTypes.object
  };
  public static defaultProps = {
    horizontal: true,
    vertical: true,
    left: false,
    right: false,
    up: false,
    down: false,
    continuous: true,
    initialVelocityThreshold: 0.2,
    verticalThreshold: 1,
    horizontalThreshold: 5,
    setGestureState: true,
    handlerStyle: {}
  };
  private swipeDetected: boolean;
  private velocityProp: any;
  private distanceProp: any;
  private swipeDirection: string;
  private panResponder: any;
  public constructor(props) {
    super(props);
    this.state = {
      swipe: {
        direction: null,
        distance: 0,
        velocity: 0
      }
    };
    // swipe is happen
    this.swipeDetected = false;
    // swipe speed
    this.velocityProp = null;
    // swipe distance
    this.distanceProp = null;
    // swipe direction
    this.swipeDirection = null;
    // should check the PanResponder type file
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => {
        return true;
      },
      onMoveShouldSetPanResponder: () => {
        return true;
      },
      onPanResponderMove: (evt, gestureState) => {
        const { dx, dy, vx, vy } = gestureState;
        const {
          onSwipeBegin,
          onSwipe,
          horizontal,
          vertical,
          initialVelocityThreshold,
          horizontalThreshold,
          verticalThreshold,
          left,
          right,
          up,
          down
        } = this.props;
        // when no swipe
        if (!this.props.continuous && this.swipeDetected) {
          return;
        }
        let initialDetection = false;
        let validHorizontal = false;
        let validVertical = false;

        if (!this.swipeDetected) {
          initialDetection = true;
          // horizontal
          validHorizontal = horizontal
            ? isValidSwipe(vx, dy, initialVelocityThreshold, verticalThreshold)
            : false;

          // vertical
          validVertical = vertical
            ? isValidSwipe(
              vy,
              dx,
              initialVelocityThreshold,
              horizontalThreshold
            )
            : false;

          if (validHorizontal) {
            evt.preventDefault && evt.preventDefault();
            this.velocityProp = 'vx';
            this.distanceProp = 'dx';
            // left
            if ((horizontal || left) && dx < 0) {
              this.swipeDirection = directions.SWIPE_LEFT;
              // right
            } else if ((horizontal || right) && dx > 0) {
              this.swipeDirection = directions.SWIPE_RIGHT;
            }
          } else if (validVertical) {
            this.velocityProp = 'vy';
            this.distanceProp = 'dy';
            // up
            if ((vertical || up) && dy < 0) {
              this.swipeDirection = directions.SWIPE_UP;
              // down
            } else if ((vertical || down) && dy > 0) {
              this.swipeDirection = directions.SWIPE_DOWN;
            }
          }

          if (this.swipeDirection) {
            this.swipeDetected = true;
          }
        }

        if (this.swipeDetected) {
          // gestureState.dx || gestureState.dy
          const distance = gestureState[this.distanceProp];
          // gestureState.vx || gestureState.vx
          const velocity = gestureState[this.velocityProp];

          const swipeState = {
            direction: this.swipeDirection,
            distance,
            velocity
          };

          if (initialDetection) {
            onSwipeBegin && onSwipeBegin(swipeState);
          } else {
            onSwipe && onSwipe(swipeState);
          }

          if (this.props.setGestureState) {
            this.setState({
              swipe: swipeState
            });
          }
        }
      },
      onPanResponderTerminationRequest: () => true,
      onPanResponderTerminate: this.handleTerminationAndRelease.bind(this),
      onPanResponderRelease: this.handleTerminationAndRelease.bind(this)
    } as any);
  }
  private handleTerminationAndRelease() {
    if (this.swipeDetected) {
      const { onSwipeEnd } = this.props;
      onSwipeEnd &&
        onSwipeEnd({
          direction: this.swipeDirection,
          distance: this.state.swipe.distance,
          velocity: this.state.swipe.velocity
        });
    }
    this.swipeDetected = false;
    this.velocityProp = null;
    this.distanceProp = null;
    this.swipeDirection = null;
  }

  public render() {
    const { onSwipeBegin, onSwipe, onSwipeEnd, ...props } = this.props;
    const style = {
      alignSelf: 'flex-start'
    };
    const state = this.props.setGestureState ? this.state : null;
    return (
      <View
        {...this.panResponder.panHandlers}
        style={{ ...style, ...props.handlerStyle }}
      >
        <View {...props} {...state}>
          {this.props.children}
        </View>
      </View>
    );
  }
}

export default SwipeEvent;
