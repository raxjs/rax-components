/* eslint-disable import/no-extraneous-dependencies */
import { createElement, render, useState } from 'rax';
import DriverUniversal from 'driver-universal';
import Modal from '../src/index';
import Text from 'rax-text';
import View from 'rax-view';

const Demo = props => {
  const [visible, setVisible] = useState(false);
  return (
    [
      <View style={{
        width: '750rpx',
        height: '3000rpx'
      }} onClick={() => setVisible(true)}>
        <Text>open</Text>
      </View>,
      <Modal
        visible={visible}
        animation={false}
        onHide={() => {
          setVisible(false);
        }}
        onShow={() => {
          setVisible(true);
        }}
        maskCanBeClick={true}
        contentStyle={{
          position: 'absolute',
          top: '150rpx',
          width: '400rpx',
          left: '175rpx'
        }}
      >
        <Text>Modal Content Here</Text>
      </Modal>
    ]
  );
};

render(<Demo />, document.body, { driver: DriverUniversal });
