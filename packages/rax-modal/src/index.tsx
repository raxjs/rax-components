import { createElement, useState, useRef, useEffect } from 'rax';
import View from 'rax-view';
import transition from 'universal-transition';
import { isWeb, isWeex } from 'universal-env';
import { ModalProps } from './types';
import './index.css';

declare function __weex_require__(s: string): any;

function Modal(props: ModalProps) {
  const {
    visible,
    maskCanBeClick = true,
    maskStyle = {},
    contentStyle = {},
    onShow,
    onHide,
    children,
    delay = 0,
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

  const [visibility, setVisibility] = useState(visible ? 'visible' : 'hidden');
  const [height, setHeight] = useState(null);

  if (isWeex) {
    const dom = __weex_require__('@weex-module/dom');
    dom.getComponentRect('viewport', (e) => {
      setHeight(e.size.height);
    });
  } else if (isWeb) {
    setHeight('100vh');
  }

  const animate = (callback: Function) => {
    transition(maskRef.current, {
      opacity: visible ? 1 : 0
    }, {
      timingFunction: 'ease',
      delay,
      duration: visible ? duration[0] : duration[1]
    }, () => {
      callback && callback();
    });
  };

  const show = () => {
    setVisibility('visible');
    animate(() => {
      onShow && onShow();
    });
  };

  const hide = () => {
    if (visibility !== 'hidden') { // execute hide animation on element that is already hidden will cause bug
      animate(() => {
        setVisibility('hidden');
        onHide && onHide();
      });
    }
  };

  useEffect(() => {
    visible ? show() : hide();
  }, [visible]);


  return (
    <View
      className="rax-modal-mask"
      style={{
        ...maskStyle,
        // @ts-ignore
        visibility,
        height: height || 0
      }}
      onClick={(e) => {
        if (maskCanBeClick) {
          onHide && onHide();
        }
      }}
      ref={maskRef}
    >
      <View
        className="rax-modal-main"
        style={contentStyle}
        onClick={(e) => {
          if (isWeb) {
            e.stopPropagation && e.stopPropagation();
          }
        }}>
        {children}
      </View>
    </View>
  );
};
Modal.displayName = 'Modal';

export default Modal;
