/** @jsx createElement */

'use strict';

import { createElement, createRef } from 'rax';
import View from 'rax-view';
import { isWeex } from 'universal-env';
import binding from 'weex-bindingx';
import transition from 'universal-transition';
import Detection from './Detection';
import TabPanel from './TabPanel';
import {
  clamp,
  noop,
  forbidSwipeBack,
  Event as Emitter,
  combineStyle,
} from './Utils';
import BaseView from './BaseView';
import PanView from './PanView';
import PropTypes from 'prop-types';
import findDOMNode from 'rax-find-dom-node';
import { convertUnit } from 'style-unit';

function setStyles(node, styles) {
  for (let key in styles) {
    let val = styles[key];
    if (isWeex) {
      node.setStyle(key, convertUnit(val, key, 'weex'));
    } else {
      node.style[key] = convertUnit(val, key, 'web');
    }
  }
}

function getEl(el) {
  return isWeex ? findDOMNode(el).ref : findDOMNode(el);
}

// solve for transition duration = 0 bug
const MIN_DURATION = 1;

const DURATION = 250;
const DEFAULT_EASING = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)';

const styles = {
  container: {
    width: 750,
    position: 'absolute',
    top: 0,
    bottom: 0,
    overflow: 'hidden',
  },
  wrap: {
    position: 'absolute',
    flexDirection: 'row',
    top: 0,
    bottom: 0,
  },
};

class DefaultView extends BaseView {
  constructor(props) {
    super(props);
    this.wrap = createRef();
  }

  x = 0;
  itemWidth = 750;
  itemCount = 0;
  curIndex = null;
  startTime = null;
  token = null;
  isScrolling = false;
  shouldBind = false;
  isPropagationStopped = false;

  static defaultProps = {
    panDist: null,
    duration: DURATION,
    easing: DEFAULT_EASING,
    isPanEnabled: true,
    isSlideEnabled: true,
    beforeExpressionBind: noop,
    pageConfig: [],
    defaultFocusIndex: 0,
    forbidSwipeBackOnIOS: 'auto',
  };

  static contextTypes = {
    isInATabPanel: PropTypes.bool,
    uuid: PropTypes.number,
    isInATabPanelDefaultView: PropTypes.bool,
    parentDefaultView: PropTypes.Component,
  };

  getChildContext() {
    return {
      isInATabPanelDefaultView: true,
      parentDefaultView: this,
    };
  }

  componentWillMount() {
    let { style } = this.props;

    this.itemWidth = style.width || this.itemWidth;

    Emitter.on('scroll', () => {
      this.isScrolling = true;
      if (this.scrollTimer) {
        clearTimeout(this.scrollTimer);
      }
      this.scrollTimer = setTimeout(() => {
        this.isScrolling = false;
      }, 200);
    });
    if (Detection.isEnableSliderAndroid) {
      Emitter.on('tabpanelcell:panstart', this.bindCellPanExp);
    }
  }

  bindCellPanExp = (e) => {
    // check uuid
    let { uuid } = this.props;
    if (e.uuid == uuid && e.element) {
      this.bindPanExp(e.element);
    }
  };

  componentDidMount() {
    this.countItems();
    let { defaultFocusIndex = 0 } = this.props;
    this.switchTo(defaultFocusIndex, {
      duration: 0,
      params: { type: 'default' },
    });
  }

  componentWillReceiveProps(props) {
    if (props) {
      this.countItems(props);
    }
  }

  handleSwipeBack = () => {
    if (isWeex && Detection.isEnableSlider) {
      let { forbidSwipeBackOnIOS } = this.props;
      if (forbidSwipeBackOnIOS === 'auto') {
        if (this.curIndex === 0) {
          forbidSwipeBack(false);
        } else {
          forbidSwipeBack(true);
        }
      } else {
        forbidSwipeBack(!!forbidSwipeBackOnIOS);
      }
    }
  };

  switchTo = (index, options = { params: {} }) => {
    let { beforeSwitch = noop, afterSwitch = noop } = this.props;
    let { duration = this.props.duration, params } = options;
    index = clamp(index, 0, this.itemCount - 1);
    let prevIndex = this.curIndex;
    beforeSwitch({ index, params, prevIndex });
    this.curIndex = index;
    this.renderPanel(index);
    let itemWidth = this.itemWidth;
    let end = -index * itemWidth;
    const wrap = findDOMNode(this.wrap.current);

    let callback = () => {
      this.curIndex = index;
      afterSwitch({ index, params, prevIndex });
      this.handleScreens();
      this.handleSwipeBack();
    };

    if (duration === 0) {
      setStyles(wrap, {
        transform: `translateX(${end}rpx)`,
        webkitTransform: `translateX(${end}rpx)`,
      });
      return callback();
    }

    transition(
      wrap,
      {
        transform: `translateX(${end}rpx)`,
        webkitTransform: `translateX(${end}rpx)`,
      },
      {
        timingFunction: this.props.easing,
        delay: 0,
        duration: Math.max(
          this.props.isSlideEnabled ? duration : 0,
          MIN_DURATION
        ),
      },
      callback
    );
  };

  bindPanExp = (anchor) => {
    this.anchor = anchor;

    if (!Detection.isEnableSlider) return;

    let { extraBindingProps = [] } = this.props;

    if (typeof extraBindingProps === 'function') {
      extraBindingProps = extraBindingProps();
    }

    if (!this.props.isPanEnabled) {
      return;
    }

    this.x = -this.curIndex * this.itemWidth;

    let expression = {
      origin: `x+${this.x}`,
      transformed: `{\"type\":\"+\",\"children\":[{\"type\":\"Identifier\",\"value\":\"x\"},{\"type\":\"NumericLiteral\",\"value\":${this.x}}]}`,
    };
    if (this.curIndex === 0) {
      // left edge bounce
      expression.origin = `x > 0 ? (x/3+${this.x}) : (x + ${this.x})`;
      expression.transformed = ` {\"type\":\"?\",\"children\":[{\"type\":\">\",\"children\":[{\"type\":\"Identifier\",\"value\":\"x\"},{\"type\":\"NumericLiteral\",\"value\":0}]},{\"type\":\"+\",\"children\":[{\"type\":\"/\",\"children\":[{\"type\":\"Identifier\",\"value\":\"x\"},{\"type\":\"NumericLiteral\",\"value\":3}]},{\"type\":\"NumericLiteral\",\"value\":${this.x}}]},{\"type\":\"+\",\"children\":[{\"type\":\"Identifier\",\"value\":\"x\"},{\"type\":\"NumericLiteral\",\"value\":${this.x}}]}]}`;
    }

    if (this.curIndex === this.itemCount - 1) {
      // right edge bounce
      expression.origin = `x < 0 ? (x/3+${this.x}) : (x + ${this.x})`;
      expression.transformed = `{\"type\":\"?\",\"children\":[{\"type\":\"<\",\"children\":[{\"type\":\"Identifier\",\"value\":\"x\"},{\"type\":\"NumericLiteral\",\"value\":0}]},{\"type\":\"+\",\"children\":[{\"type\":\"/\",\"children\":[{\"type\":\"Identifier\",\"value\":\"x\"},{\"type\":\"NumericLiteral\",\"value\":3}]},{\"type\":\"NumericLiteral\",\"value\":${this.x}}]},{\"type\":\"+\",\"children\":[{\"type\":\"Identifier\",\"value\":\"x\"},{\"type\":\"NumericLiteral\",\"value\":${this.x}}]}]}`;
    }

    this.startTime = Date.now();

    let props = [
      {
        element: this.wrap.current,
        property: 'transform.translateX',
        expression: expression,
      },
      ...extraBindingProps,
    ];

    props.forEach((prop) => {
      if (prop && prop.element) {
        prop.element = getEl(prop.element);
      }
    });

    let res = binding.bind(
      {
        anchor: getEl(anchor),
        eventType: 'pan',
        options: {
          touchAction: 'pan-x',
        },
        props,
      },
      (e) => {
        if (e.state == 'end') {
          // unbind bindingx
          if (this.token) {
            binding.unbind({
              token: this.token,
              eventType: 'pan',
              anchor: getEl(anchor),
            });
          }
        }
        this.onPanCallback(e);
      }
    );

    this.token = res && res.token;
  };

  onPanCallback = (e) => {
    if (e.state === 'end' && Math.abs(e.deltaX) > 0) {
      let duration = Date.now() - this.startTime;
      const dist = e.deltaX;
      const panDist = this.props.panDist
        ? this.props.panDist
        : this.itemWidth / 2;
      let newIndex = this.curIndex;
      if (
        Math.abs(dist) > panDist ||
        Math.abs(dist) / duration > 0.5 && duration < 200
      ) {
        if (dist > 0) {
          newIndex--;
        } else {
          newIndex++;
        }
      }
      if (isWeex && Detection.iOS && !binding.isSupportNewBinding) {
        setTimeout(() => {
          this.switchTo(newIndex);
        }, 30);
      } else {
        this.switchTo(newIndex);
      }
    }
  };

  onHorizontalPan = (e) => {
    if (e.state === 'end') {
      this.isPropagationStopped = false;
    }

    if (e.state === 'start' && !this.isScrolling) {
      this.bindPanExp(this.wrap.current);
    }
  };

  render() {
    let { isPanEnabled } = this.props;

    let curIndex = this.curIndex;

    if (this.props.children && !(this.props.children instanceof Array)) {
      this.props.children = [this.props.children];
    }

    let children =
      this.props.children &&
      this.props.children.map((child, index) => {
        if (child && child.type === TabPanel) {
          return (
            <TabPanel
              index={index}
              curIndex={curIndex}
              {...child.props}
              style={combineStyle(
                { width: this.itemWidth },
                { ...child.props.style }
              )}
              ref={`panel_${index}`}
            />
          );
        } else {
          return child;
        }
      });

    let wrapProps =
      !Detection.isEnableSliderAndroid && isPanEnabled
        ? { onHorizontalPan: this.onHorizontalPan }
        : {};

    return (
      <View
        {...this.props}
        style={combineStyle(styles.container, this.props.style)}
      >
        <PanView ref={this.wrap} {...wrapProps} style={styles.wrap}>
          {children}
        </PanView>
      </View>
    );
  }
}

export default DefaultView;
