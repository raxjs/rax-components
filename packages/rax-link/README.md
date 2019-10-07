[![npm](https://img.shields.io/npm/v/rax-link.svg)](https://www.npmjs.com/package/rax-link)

**描述：**
Link 是基础的链接组件，同 a 标签。它带有默认样式 textDecoration: 'none'。
在浏览器中，同我们熟悉的 a 标签，使用 Link 标签并不能新开一个 webview ，它只是在当前的 webview 中做页面的跳转。
## 安装

```bash
$ npm install rax-link --save
```
## 属性

注：
1、**支持**列表中的 <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" />代表h5, <img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" />代表weex,  <img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" />代表小程序
2、小程序中需要通过mpHref传递参数支持跳转，参数以“*跳转类型:目标地址*”格式传递，跳转类型支持：
navigate：从当前页面，跳转到应用内的某个指定页面，
redirect：关闭当前页面，跳转到应用内的某个指定页面，
switchTab：跳转到指定标签页（tabbar）页面，并关闭其他所有非标签页页面，
navigateBack：关闭当前页面，返回上一级或多级页面 四种，
默认值为navigate。

|**属性**| **类型** | **默认值** | **必填** | **描述**           | **支持** |
| ----------- | ---------- | ---------- | ------------ | ------------------ | ------------ |
| onPress     | `function` | -          |     false         | 节点被点击之后触发 | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /> <img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" /> <img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" />|
| href     | `String` | -          |      true        | 跳转目标地址 | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /> <img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" />|
| mpHref     | `String` | -          |     true         | 跳转类型:跳转地址 | <img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" />|
## 示例
```jsx
import {createElement, render} from 'rax';
import DU from 'driver-universal';
import Link from 'rax-link';
import Text from 'rax-text';

render(<Link href={"//www.taobao.com"} onPress={(e)=>{console.log(e)}}><Text style={{
  fontSize: 14,
  color: '#333333'
}}>点击跳转</Text></Link>, document.body, { driver: DU });

```
