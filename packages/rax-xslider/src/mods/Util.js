'use strict';

import Detection from './Detection';
import {isWeex} from 'universal-env';
import findDOMNode from 'rax-find-dom-node';

/*
 forEach({a: 1, b: 2}, (v, k) => {
 console.log({
 v, k
 })
 })

 forEach([1,2,3],(v,k)=>{
 console.log({
 v,k
 })
 })
 */

function forEach(o, fn) {
  if (o instanceof Array) {
    return Array.prototype.forEach.call(o, fn);
  }
  Object.keys(o).forEach((key) => {
    fn(o[key], key);
  });
}


/* console.log(
 find([{name: 1}, {name: 2}], (o) => {
 return o.name === 2;
 }))

 console.log(find([{name: 1,age:2}, {name: 2}], {name:1}))
 */
function find(o, condition) {
  var result = null;
  forEach(o, (v, k) => {
    if (typeof condition === 'function') {
      if (condition(v, k)) {
        result = v;
      }
    } else {
      var propName = Object.keys(condition)[0];
      if (propName && v[propName] === condition[propName]) {
        result = v;
      }
    }
  });
  return result;
}

function findIndex(o, condition) {
  return o.indexOf(find(o, condition));
}

function map(o, fn) {
  if (o instanceof Array) {
    return Array.prototype.map.call(o, fn);
  } else {
    var result = [];
    forEach(o, (v, k) => {
      result.push(fn(v, k));
    });
    return result;
  }
}

function isLoop(loop) {
  return Detection.Android && isWeex ? false : loop;
}

function negative(val) {
  return val < 0 ? `${Math.abs(val)}*(0-1)` : `${val}`;
}

function getLast(array) {
  if (!array || !array.length) return;
  return array[array.length - 1];
}

/*
{out2: 1, out1: 1.3, in2: 0, in1: -150, ratio: -0.0020000000000000005}
in1 * x + y = out1
in2 * x + y = out2 => y = out2 - in2 * x
in1 * x + out2 - in2 * x = out1
x  = (out1 - out2) / (in1 - in2)
y = out2 - in2 * (out1 - out2) / (in1 - in2)
 */

function transformExpression(in1, in2, out1, out2, ix) {
  let inMax = Math.max(in1, in2);
  let inMin = Math.min(in1, in2);
  let outMax = Math.max(out1, out2);
  let outMin = Math.min(out1, out2);
  let inverse = in1 > in2;
  let x = (out1 - out2) / (in1 - in2);
  let y = out2 - in2 * (out1 - out2) / (in1 - in2);
  return `min(${outMax},max(${outMin},(${ix}>=${negative(inMin)}&&${ix}<=${negative(inMax)})?(${ix}*${negative(x)}+${negative(y)}):(${ix}<${negative(inMin)}?(${negative(inverse ? out2 : out1)}):(${negative(inverse ? out1 : out2)}))))`;
}

function transformRangeSpec(el, config, inverse) {
  let outputRange = config.outputRange;
  let end = inverse ? outputRange[1] : outputRange[0];
  return {
    element: el,
    property: config.property,
    end
  };
}

function getEl(el) {
  return isWeex ? findDOMNode(el).ref : findDOMNode(el);
}

const noop = () => {
};

function clamp(value, min, max) {
  return min < max
    ? value < min ? min : value > max ? max : value
    : value < max ? max : value > min ? min : value;
}


let __i = 0;


function uuid() {
  let id = __i++;
  return id;
}

let Emitter = {
  on: (eventName, handler) => {
    window.addEventListener(eventName, handler);
  },
  emit: (eventName, data) => {
    var event = new window.Event(eventName);
    if (data) {
      Object.keys(data).forEach((k) => {
        event[k] = data[k];
      });
    }
    window.dispatchEvent(event);
  }
};

function formatTransformValue(num, noUnit) {
  const unit = noUnit ? '' : 'rpx';
  return num + unit;
}

export default {
  find,
  uuid,
  forEach,
  map,
  findIndex,
  isLoop,
  clamp,
  noop,
  getEl,
  transformExpression,
  transformRangeSpec,
  getLast,
  Emitter,
  formatTransformValue
};

export {
  find,
  uuid,
  forEach,
  map,
  findIndex,
  isLoop,
  clamp,
  noop,
  getEl,
  transformExpression,
  transformRangeSpec,
  getLast,
  Emitter,
  formatTransformValue
};