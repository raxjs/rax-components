/* eslint-disable import/no-extraneous-dependencies */
import { createElement, render } from 'rax';
import * as DriverDOM from 'driver-dom';
import * as DriverWeex from 'driver-weex';
import { isWeex } from 'universal-env';
import Embed from '../src/index';

const urlParam = {
  paramOne: 123,
  paramTwo: 456
};
render(<Embed urlParam={urlParam} src={'http://taobao.com'} useIframeInWeb={true} style={{
  height: 750,
  width: 750
}} />, document.body, { driver: isWeex ? DriverWeex : DriverDOM });
