/* eslint-disable import/no-extraneous-dependencies */
import { createElement, render } from 'rax';
import DU from 'driver-universal';
import QRCode from '../src/index';

function App() {
  return (
      <QRCode
        data="http://market.m.taobao.com/apps/market/m-vip/88-festival.html?wh_weex=true&wx_navbar_transparent=true"
        style={{ width: 400, height: 400 }}
      />
  );
}

render(<App />, document.body, { driver: DU });
