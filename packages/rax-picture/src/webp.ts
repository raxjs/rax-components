/**
 * lossy : Lossy compression
 * lossless : lossless compression
 * alpha : example png
 * animation : example gif
 */

import { isWeex, isNode, isMiniApp, isWeChatMiniProgram } from 'universal-env'

function setLocalStorage(isSupport: boolean, type: string) {
  if (window.localStorage && typeof window.localStorage.setItem === 'function') {
    try {
      window.localStorage.setItem('webpsupport-' + type, isSupport + '');
    } catch (e) {
    }
  }
}

function isSupportTest(callback: (isSupport: boolean) => void, type: string) {
  if ('function' !== typeof callback) return;
  let img = new Image();
  img.onload = function() {
    let is = img.width > 0 && img.height > 0;
    setLocalStorage(is, type);
    callback(is);
  };
  img.onerror = function() {
    setLocalStorage(false, type);
    callback(false);
  };
  img.src = '//gw.alicdn.com/mt/TB11KmBXwoQMeJjy0FoXXcShVXa-1-1.png_.webp';
}

function checkWebpByUserAgent(userAgent) {
  if (userAgent.match(/PHA/)) {
    return true;
  }

  if (userAgent.match(/windows|win32/i)) {
    return true;
  }

  if (userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) && userAgent.match(/UCBrowser/i)) {
    return true;
  }

  return false;
}

export function isSupport(callback: (status: boolean) => void, type = 'lossy') {
  if ('function' === typeof callback) {
    if (isMiniApp || isWeChatMiniProgram) {
      callback(true);
    } else if (isWeex) {
      callback(true);
    } else if (isNode) {
      callback(true);
    } else if (typeof window !== 'undefined') { 
      if (window.navigator && window.navigator.userAgent && checkWebpByUserAgent(window.navigator.userAgent)) {
        callback(true);
      } else if (window.chrome || window.opera) {
        callback(true);
      } else if (window.localStorage && window.localStorage.getItem('webpsupport-' + type) == 'true') {
        callback(true);
      } else {
        isSupportTest(callback, type);
      }
    } else {
      callback(false)
    }
  }
}
