'use strict';

import {
  createElement,
  useRef,
  ForwardRefExoticComponent,
  forwardRef,
  useEffect,
  EffectCallback,
  useImperativeHandle
} from 'rax';
import View from 'rax-view';
import findDOMNode from 'rax-find-dom-node';
import { isWeex } from 'universal-env';
import bindingx from 'weex-bindingx';
import { ParallaxRange, ParallaxProps } from './types';

// findDOMNode has difference between weex an web
function getEl(el: Rax.RefObject<any>) {
  if (typeof el === 'string' || typeof el === 'number') return el;
  if (!el.current) return null;
  return isWeex ? findDOMNode(el.current).ref : findDOMNode(el.current);
}

// judge bindingx support
const isSupportBinding = !!bindingx.isSupportBinding;
/*
{
  type: 'translate',
  in: [0, 660],
  out: [0, 0, 0, -660] // [x1,y1,x2,y2]
}
{
  expression:'y',
  property:'transform.translate'
}
 */
function transformRangeToExpression<T extends 'transform' | 'backgroundColor' | 'opacity'>(
  params: ParallaxRange<T extends 'backgroundColor' ? string : number>,
  propertyType: T
) {
  let input = params.in;
  let output = params.out;
  let result: {
    property: string;
    expression: string;
  }[] = [];

  // resolve negative number in expression
  function negative(val) {
    return val < 0 ? `${Math.abs(val)}*(0-1)` : `${val}`;
  }
  /*
  {out2: 1, out1: 1.3, in2: 0, in1: -150, ratio: -0.0020000000000000005}
  in1 * x + y = out1
  in2 * x + y = out2 => y = out2 - in2 * x
  in1 * x + out2 - in2 * x = out1
  x  = (out1 - out2) / (in1 - in2)
  y = out2 - in2 * (out1 - out2) / (in1 - in2)
   */

  function transformExpression(
    in1: number,
    in2: number,
    out1: number,
    out2: number
  ) {
    let inMax = Math.max(in1, in2);
    let inMin = Math.min(in1, in2);
    let outMax = Math.max(out1, out2);
    let outMin = Math.min(out1, out2);
    let inverse = in1 > in2;
    let x = (out1 - out2) / (in1 - in2);
    let y = out2 - in2 * (out1 - out2) / (in1 - in2);
    return `min(${outMax},max(${outMin},(y>=${negative(inMin)}&&y<=${negative(
      inMax
    )})?(y*${negative(x)}+${negative(y)}):(y<${negative(inMin)}?(${negative(
      inverse ? out2 : out1
    )}):(${negative(inverse ? out1 : out2)}))))`;
  }

  switch (propertyType) {
    case 'transform':
      if (params.type == 'translate' || params.type == 'scale') {
        let x1 = output[0];
        let y1 = output[1];
        let x2 = output[2];
        let y2 = output[3];

        result.push({
          property: `transform.${params.type}Y`,
          expression: transformExpression(
            input[0],
            input[1],
            y1 as number,
            y2 as number
          )
        });

        result.push({
          property: `transform.${params.type}X`,
          expression: transformExpression(
            input[0],
            input[1],
            x1 as number,
            x2 as number
          )
        });
      }

      if (params.type == 'rotate') {
        result.push({
          property: `transform.${params.type}Z`,
          expression: transformExpression(
            input[0],
            input[1],
            output[0] as number,
            output[1] as number
          )
        });
      }
      break;
    case 'opacity':
      result = [
        {
          property: 'opacity',
          expression: transformExpression(
            input[0],
            input[1],
            output[0] as number,
            output[1] as number
          )
        }
      ];
      break;
    case 'backgroundColor':
      result = [
        {
          property: 'background-color',
          expression: `evaluateColor(\'${output[0]}\',\'${
            output[1]
          }\',${transformExpression(input[0], input[1], 0, 1)})`
        }
      ];
      break;
  }

  return result;
}

const useEffectOnce = (effect: EffectCallback) => {
  useEffect(effect, []);
};

const BindingParallax: ForwardRefExoticComponent<
ParallaxProps
> = forwardRef((props, ref) => {
  const parallaxRef = useRef(null);
  const { className, style, ...rest } = props;
  useEffectOnce(() => {
    const {
      bindingScroller,
      bindingProps = [],
      transform = [],
      backgroundColor,
      opacity,
      extraBindingProps = [],
    } = props;
    const parallax = getEl(parallaxRef);
    transform.forEach(trans => {
      transformRangeToExpression(trans, 'transform').forEach(r => {
        bindingProps.push({
          element: parallax,
          property: r.property,
          expression: r.expression,
          config: {
            transformOrigin: 'center'
          }
        });
      });
    });

    if (backgroundColor) {
      transformRangeToExpression(backgroundColor, 'backgroundColor').forEach(r => {
        bindingProps.push({
          element: parallax,
          property: r.property,
          expression: r.expression
        });
      });
    }

    if (opacity) {
      transformRangeToExpression(opacity, 'opacity').forEach(r => {
        bindingProps.push({
          element: parallax,
          property: r.property,
          expression: r.expression
        });
      });
    }

    if (extraBindingProps && extraBindingProps.length) {
      extraBindingProps.forEach(prop => {
        prop.element = getEl(prop.element);
      });
    }
    bindingx.bind({
      anchor: bindingScroller,
      eventType: 'scroll',
      props:
        extraBindingProps && extraBindingProps.length
          ? [...bindingProps, ...extraBindingProps]
          : bindingProps
    });
  });
  useImperativeHandle(ref, () => parallaxRef.current);
  return (
    <View {...rest} ref={parallaxRef} className={className} style={style} >
      {props.children}
    </View>
  );
});

const Parallax: ForwardRefExoticComponent<ParallaxProps> = forwardRef((props, ref) => {
  let { bindingScroller, className, style, ...rest } = props;
  const scroller = getEl(bindingScroller);
  if (!scroller) return null;
  if (isSupportBinding || !isWeex) {
    return <BindingParallax {...rest} className={className} style={style} bindingScroller={scroller} />;
  }
  return isWeex ? (
    <parallax ref={ref} {...rest} className={className} style={style} bindingScroller={scroller} />
  ) : (
    <View ref={ref} {...rest} className={className} style={style} />
  );
});

export default Parallax;
