---
title: Baisc
order: 1
---

basic usage

```jsx
/* eslint-disable import/no-extraneous-dependencies */
import { createElement, render } from 'rax';
import DriverUniversal from 'driver-universal';
import Embed from '../src/index';

const urlParam = {
  paramOne: 123,
  paramTwo: 456
};

const App = () => {
  return (
  <div>
    <Embed urlParam={urlParam} src={'http://taobao.com'} useIframeInWeb={true} style={{
      height: '750rpx',
      width: '750rpx'
      }} />
  </div>
  )
}

export default App;
```
