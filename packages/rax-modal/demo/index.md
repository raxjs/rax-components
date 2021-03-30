---
title: Baisc
order: 1
---

basic usage

```jsx

/* eslint-disable import/no-extraneous-dependencies */
import { createElement, render, useState, useEffect } from 'rax';
import DriverUniversal from 'driver-universal';
import Modal from '../src/index';
import Text from 'rax-text';
import View from 'rax-view';

const Demo = props => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setVisible(true);
    }, 2000)
  }, [])
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
        animation={true}
        duration={[100, 10000]}
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
```
