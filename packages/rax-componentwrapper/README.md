## rax-componentwrapper

## 支持
阿里小程序（运行时） / 微信小程序(运行时)

## 描述
在运行时小程序中，默认所有的数据更新都使用 `Page` 的 `setData` 方法。对于部分需要频繁更新数据的元素来说，可以在元素外包裹 `rax-componentwrapper` 的方式，自动将该元素转成自定义组件，当元素数据发生变化时，使用组件的 `setData`，来起到性能优化的目的。
## 安装

```
$ npm install rax-componentwrapper --save
```

## 使用

```
import ComponentWrapper from 'rax-componentwrapper';
```
## 例子

```
import { createElement, render } from 'rax';
import DriverUniversal from 'driver-universal';
import ComponentWrapper from 'rax-excomponentwrapperample';
import View from 'rax-view'

render((
  <ComponentWrapper>
    <View>example</View>
  </ComponentWrapper>
), document.body, { driver: DriverUniversal });
```
