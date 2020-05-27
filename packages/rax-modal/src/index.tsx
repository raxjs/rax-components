import { createElement, useState, useRef, useEffect } from 'rax';
import View from 'rax-view';
import transition from 'universal-transition';
import { isWeb, isWeex } from 'universal-env';
import { ModalProps, MaskRef } from './types';
import './index.css';

declare function __weex_require__(s: string): any;

let bodyEl, originalBodyOverflow;
let modalCount = 0;

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
    onMaskClick,
    maskCanBeClick = true,
    maskStyle = {},
    contentStyle = {},
    onShow,
    onHide,
    children,
    animation = true,
    delay = 0
  } = props;

  let {
    duration = [300, 300] // [in, out]
  } = props;

  if (typeof duration === 'number') {
    duration = [duration, duration];
  } else if (duration.length === 1) {
    // If duration's length is one, in and out are the same.
    duration = [duration[0], duration[0]];
  }

  const maskRef: MaskRef = useRef<HTMLDivElement>(null) as MaskRef;

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
    maskRef.__animationValid = true;
    const animateDuration = show ? duration[0] : duration[1];
    // Record animation execute timer
    maskRef.__timer = setTimeout(() => {
      maskRef.__animationValid = false;
      if (show && maskRef.current) {
        // When target state is show, it need set modal opacity to 1
       maskRef.current.style.opacity = '1';
      }
      callback && callback();
    }, animateDuration)

    transition(
      maskRef.current,
      {
        opacity: show ? 1 : 0
      },
      {
        timingFunction: 'ease',
        delay,
        duration: animateDuration
      },
      () => {
        // Ensure animation timer hasn't been executed
        if (maskRef.__animationValid) {
          clearTimeout(maskRef.__timer);
          if (show && maskRef.current) {
            // When target state is show, it need set modal opacity to 1
            maskRef.current.style.opacity = '1';
          }
          callback && callback();
        }
      }
    );
  };

  const show = () => {
    if (!maskRef.__pendingShow) {
      maskRef.__pendingShow = true;
      if (isWeb) {
        // Only when current modal count is 1, it need record origin body overflow
        if (modalCount === 1) {
          originalBodyOverflow = bodyEl.style.overflow;
        }
        bodyEl.style.overflow = 'hidden';
      }
      setVisibleState(true);
      if (animation) {
        maskRef.current.style.opacity = '0';
        animate(true, () => {
          onShow && onShow();
        });
      } else {
        maskRef.current.style.opacity = '1';
        onShow && onShow();
      }
    }
  };

  const hideAction = () => {
    if (isWeb && modalCount === 1) {
      bodyEl.style.overflow = originalBodyOverflow;
    }
    setVisibleState(false);
    onHide && onHide();
  };

  const hide = () => {
    if (visibleState && !maskRef.__pendingHide) {
      maskRef.__pendingHide = true;
      if (animation) {
        // execute hide animation on element that is already hidden will cause bug
        animate(false, () => {
          hideAction();
        });
      } else {
        hideAction();
      }
    }
  };


  useEffect(() => {
    // When a new modal mounted, modal count ++
    modalCount++;
    return () => {
      // When the modal unmounted modal mount --
      modalCount--;
      // Clear timer
      clearTimeout(maskRef.__timer);
      if (isWeb && modalCount === 0) {
        bodyEl.style.overflow = originalBodyOverflow;
      }
      if (!maskRef.__pendingHide) {
        onHide && onHide();
      }
    }
  }, [])

  useEffect(() => {
    // if state is unequal to props trigger show or hide
    if (visible !== visibleState) {
      visible ? show() : hide();
    }
  }, [visible]);

  useEffect(() => {
    // Record mask show state
    maskRef.__pendingShow = false;
    // Record mask hide state
    maskRef.__pendingHide = false;
  }, [visibleState])


  return (
    <View
      className="rax-modal-mask"
      style={{
        ...maskStyle,
        visibility: visibleState ? 'visible' : 'hidden',
        height: height || 0
      }}
      onTouchMove={stopEventEffect}
      onClick={() => {
        if (props.hasOwnProperty('onMaskClick')) {
          onMaskClick && onMaskClick();
        } else if (maskCanBeClick) {
          // When maskCanBeClick is true, should trigger hide
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
