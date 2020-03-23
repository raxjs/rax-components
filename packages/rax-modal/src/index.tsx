import { createElement, useState, useRef, useEffect } from 'rax';
import View from 'rax-view';
import transition from 'universal-transition';
import { isWeb, isWeex } from 'universal-env';
import { ModalProps } from './types';
import './index.css';

declare function __weex_require__(s: string): any;

let bodyEl, originalBodyOverflow;

if (isWeb) {
  bodyEl = document.body;
}

function stopPropagation(event) {
  if (isWeb) {
    event.stopPropagation();
  }
}

function stopEventEffect(event) {
  if (isWeb) {
    event.preventDefault();
    event.stopPropagation();
  }
}

function Modal(props: ModalProps) {
  const {
    visible,
    maskCanBeClick = true,
    maskStyle = {},
    contentStyle = {},
    onShow,
    onHide,
    children,
    animation,
    delay = 0
  } = props;

  let {
    duration = [300, 300] // [in, out]
  } = props;

  if (typeof duration === 'number') {
    duration = [duration, duration];
  } else if (duration.length === 1) {
    duration = [duration[0], duration[0]];
  }

  const maskRef = useRef<HTMLDivElement>(null);

  const [visibleState, setVisibleState] = useState(false);
  const [height, setHeight] = useState(null);

  if (isWeex) {
    const dom = __weex_require__('@weex-module/dom');
    dom.getComponentRect('viewport', e => {
      setHeight(e.size.height);
    });
  } else if (isWeb) {
    setHeight('100vh');
  }

  const animate = (show: boolean, callback: Function) => {
    transition(
      maskRef.current,
      {
        opacity: show ? 1 : 0
      },
      {
        timingFunction: 'ease',
        delay,
        duration: show ? duration[0] : duration[1]
      },
      () => {
        callback && callback();
      }
    );
  };

  const show = () => {
    if (isWeb) {
      originalBodyOverflow = bodyEl.style.overflow;
      bodyEl.style.overflow = 'hidden';
    }
    setVisibleState(true);
    if (animation) {
      onShow && onShow();
    } else {
      animate(true, () => {
        onShow && onShow();
      });
    }
  };

  const hideAction = () => {
    if (isWeb) {
      bodyEl.style.overflow = originalBodyOverflow;
    }
    setVisibleState(false);
    onHide && onHide();
  };

  const hide = () => {
    if (visibleState) {
      if (animation) {
        hideAction();
      } else {
        // execute hide animation on element that is already hidden will cause bug
        animate(false, () => {
          hideAction();
        });
      }
    }
  };

  useEffect(() => {
    // if state is unequal to props trigger show or hide
    if (visible !== visibleState) {
      visible ? show() : hide();
    }
  }, [visible]);

  return (
    <View
      className="rax-modal-mask"
      style={{
        ...maskStyle,
        // @ts-ignore
        visibility: visibleState ? 'visible' : 'hidden',
        height: height || 0
      }}
      onTouchMove={stopEventEffect}
      onClick={() => {
        if (maskCanBeClick) {
          hide();
        }
      }}
      ref={maskRef}
    >
      <View
        className="rax-modal-main"
        style={contentStyle}
        onClick={stopPropagation}
        onTouchMove={stopPropagation}
      >
        {children}
      </View>
    </View>
  );
}
Modal.displayName = 'Modal';

export default Modal;
