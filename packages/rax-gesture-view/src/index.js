/** @jsx createElement */

'use strict';

import {isWeb} from 'universal-env';
import GestureViewOnWeex from './gesture.weex';
import GestureViewOnWeb from './gesture.web';

let GestureView;

if (isWeb) {
  GestureView = GestureViewOnWeb;
} else {
  GestureView = GestureViewOnWeex;
}

export default GestureView;