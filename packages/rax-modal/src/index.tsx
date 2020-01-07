import { createElement, useState, useRef, useEffect } from 'rax';
import View from 'rax-view';
import transition from 'universal-transition';
import { isWeb, isWeex } from 'universal-env';
import { ModalProps } from './types';
import './index.css';

declare function __weex_require__(s: string): any;

function stopPropagation(event) {
  if (isWeb) {
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
    delay = 0
  } = props;

  let {
    duration = [300, 300] // [in, out]
  } = props;

  if (typeof duration === 'number') {
    duration = [duration, duration];
  } else if (duration.length === 1) {
    duration = duration.concat(duration);
  }

  const maskRef = useRef<HTMLDivElement>(null);

  const [visibleState, setVisibleState] = useState(visible);
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
    setVisibleState(true);
    animate(true, () => {
      onShow && onShow();
    });
  };

  const hide = () => {
    if (visibleState) {
      // execute hide animation on element that is already hidden will cause bug
      animate(false, () => {
        setVisibleState(false);
        onHide && onHide();
      });
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
      onTouchMove={e => e.preventDefault()}
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
      >
        {children}
      </View>
    </View>
  );
}
Modal.displayName = 'Modal';

export default Modal;
