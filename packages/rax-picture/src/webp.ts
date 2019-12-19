/**
 * lossy : Lossy compression
 * lossless : lossless compression
 * alpha : example png
 * animation : example gif
 */

import { isWeex, isNode } from 'universal-env';

let isIOS: boolean;
if (!isWeex && !isNode) {
  isIOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
}

function isSupportTest(callback: (isSupport: boolean) => void, type: string) {
  if ('function' !== typeof callback) return;
  let img = new Image;
  img.onload = function() {
    let is = img.width > 0 && img.height > 0;
    setLocalStorage(is, type);
    callback(is);
  }; img.onerror = function() {
    setLocalStorage(false, type);
    callback(false);
  };
}

function setLocalStorage(isSupport: boolean, type: string) {
  if (window.localStorage && typeof window.localStorage.setItem === 'function') {
    try {
      window.localStorage.setItem('webpsupport-' + type, isSupport + '');
    } catch (e) {
    }
  }
}

export function isSupport(callback: (status: boolean) => void, type = 'lossy') {
  if ('function' === typeof callback) {
    if (isWeex || isNode || window.navigator.userAgent.match(/PHA/)) {
      callback(true);
    } else if (window.navigator.userAgent.match(/windows|win32/i) || isIOS && window.navigator.userAgent.match(/UCBrowser/i)) {
      callback(false);
    } else if (window.chrome || window.opera) {
      callback(true);
    } else {
      let val = window.localStorage && window.localStorage.getItem('webpsupport-' + type);
      if (val) {
        callback(val == 'true');
      } else {
        isSupportTest(callback, type);
      }
    }
  }
}
