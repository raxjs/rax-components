function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var __rest = this && this.__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};

import { createElement, forwardRef } from 'rax';
import cx from 'classnames/dedupe';
import { isWeex, isMiniApp } from 'universal-env';
import indexStyleSheet from './index.css';
var _styleSheet = indexStyleSheet;

function _getClassName() {
  var className = [];
  var args = arguments[0];
  var type = Object.prototype.toString.call(args).slice(8, -1).toLowerCase();

  if (type === 'string') {
    args = args.trim();
    args && className.push(args);
  } else if (type === 'array') {
    args.forEach(function (cls) {
      cls = _getClassName(cls).trim();
      cls && className.push(cls);
    });
  } else if (type === 'object') {
    for (var k in args) {
      k = k.trim();

      if (k && args.hasOwnProperty(k) && args[k]) {
        className.push(k);
      }
    }
  }

  return className.join(' ').trim();
}

function _getStyle(classNameExpression) {
  var cache = _styleSheet.__cache || (_styleSheet.__cache = {});

  var className = _getClassName(classNameExpression);

  var classNameArr = className.split(/\s+/);
  var style = cache[className];

  if (!style) {
    style = {};

    if (classNameArr.length === 1) {
      style = _styleSheet[classNameArr[0].trim()];
    } else {
      classNameArr.forEach(function (cls) {
        var value = _styleSheet[cls.trim()];

        if (typeof value === 'object') {
          style = Object.assign(style, _styleSheet[cls.trim()]);
        }
      });
    }

    cache[className] = style;
  }

  return style;
}

var View = forwardRef(function (props, ref) {
  var className = props.className,
      style = props.style,
      rest = __rest(props, ["className", "style"]);

  if (isMiniApp) {
    // For miniapp runtime pre-compile
    var onAppear = props.onAppear,
        onDisappear = props.onDisappear,
        onFirstAppear = props.onFirstAppear;
    return createElement("view", _extends({}, rest, {
      onAppear: onAppear,
      onDisappear: onDisappear,
      onFirstAppear: onFirstAppear,
      ref: ref,
      className: "rax-view " + className,
      style: Object.assign({}, _getStyle("rax-view " + className), style)
    }));
  }

  return createElement("div", _extends({}, rest, {
    ref: ref,
    className: cx(isWeex ? '' : 'rax-view', className),
    style: Object.assign({}, _getStyle(cx(isWeex ? '' : 'rax-view', className)), style)
  }));
});
View.displayName = 'View';
export default View;