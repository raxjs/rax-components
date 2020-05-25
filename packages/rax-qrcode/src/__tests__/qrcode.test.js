import { createElement, Component } from 'rax';
import { mount } from 'enzyme';
import QrCode from '../../lib';

describe('QrCode', () => {
  it('should accpet number of width and height as px value', () => {
    function App() {
      return (
        <QRCode
          data="http://market.m.taobao.com/apps/market/m-vip/88-festival.html?wh_weex=true&wx_navbar_transparent=true"
          style={{ width: 400, height: 400 }}
        />
      );
    }
    const wrapper = mount(<App />);
    const QRCodeStyle = wrapper.get(0).style;
    expect(QRCodeStyle).toHaveProperty('width', 400);
    expect(QRCodeStyle).toHaveProperty('height', 400);
  });
});
 