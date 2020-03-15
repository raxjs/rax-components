/* eslint-disable import/no-extraneous-dependencies */
import { createElement } from 'rax';
import { renderToString } from 'rax-server-renderer';
import App from './app';

export default function() {
  return renderToString(<App />);
};
