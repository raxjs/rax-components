/* eslint-disable import/no-extraneous-dependencies */
import {createElement, render} from 'rax';
import DU from 'driver-universal';
import { isWeex } from 'universal-env';

import App from './app';

render(<App />, isWeex ? document.body : document.getElementById('root'), {
  driver: DU,
  hydrate: location.pathname.indexOf('/ssr') > -1 ? true : false, // Dev previw path for SSR is like this: http://localhost:9999/ssr/index
});
