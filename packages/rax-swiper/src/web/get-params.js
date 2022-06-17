// eslint-disable-next-line
import { Swiper } from 'swiper';
import { isObject, extend } from './utils';
import { paramsList } from './params-list';

function getParams(obj = {}) {
  const params = {
    on: {},
  };
  const events = {};
  const passedParams = {};
  extend(params, Swiper.defaults);
  extend(params, Swiper.extendedDefaults);
  params._emitClasses = true;
  params.init = false;

  const rest = {};
  const allowedParams = paramsList.map((key) => key.replace(/_/, ''));
  Object.keys(obj).forEach((key) => {
    if (allowedParams.indexOf(key) >= 0) {
      if (isObject(obj[key])) {
        params[key] = {};
        passedParams[key] = {};
        extend(params[key], obj[key]);
        extend(passedParams[key], obj[key]);
      } else {
        params[key] = obj[key];
        passedParams[key] = obj[key];
      }
    } else if (key.search(/on[A-Z]/) === 0 && typeof obj[key] === 'function') {
      events[`${key[2].toLowerCase()}${key.substr(3)}`] = obj[key];
    } else {
      rest[key] = obj[key];
    }
  });
  ['navigation', 'pagination', 'scrollbar'].forEach((key) => {
    if (params[key] === true) params[key] = {};
    if (params[key] === false) delete params[key];
  });

  // interval will not work in swiper@8, use autoplay.delay instead
  if (rest.interval) {
    if (params.autoplay === true) {
      params.autoplay = {
        delay: rest.interval
      };
    } else if (typeof params.autoplay === 'object') {
      params.autoplay.delay = rest.interval;
    }
    delete rest.interval;
  }

  return { params, passedParams, rest, events };
}

export { getParams };
