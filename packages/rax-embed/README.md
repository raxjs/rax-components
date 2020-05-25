[![npm](https://img.shields.io/npm/v/rax-embed.svg)](https://www.npmjs.com/package/rax-embed)

**描述：**

内嵌内容容器，在 weex 下为 `<web>` 实现，在 web 下为 `<iframe>` `<embed>` 实现，小程序中实现为`<webview>`。

## 安装

```bash
$ npm install rax-embed --save
```
## 引用

```jsx
import Embed from 'rax-embed';
```

## 属性
注：
1、**支持**列表中的 <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" />代表h5 <img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" />代表weex  <img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" />代表小程序
2、小程序中使用webview实现，默认会全屏覆盖当前页面，不能设置样式和透明度

| **属性**    | **类型**   | **默认值** | ** 必填 ** | **描述**           | ** 支持 ** |
| ----------- | ---------- | ---------- | ------------ | ------------------ | ------------ |
| style     | `Object` | {}         |   false           | 样式描述 | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /><img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" />  |
| src     | `String` | ''         |   false           | 嵌入的页面地址 | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /><img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" /><img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" />  |
| urlParam     | `String or Object` | ''         |   false           | 传递给子页面的参数 | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /><img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" />  |
| _page_inside_embed_     | `boolean` | true         |   false           | 页面是否在embed中 | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /><img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" /> |
| _page_home_isweex_     | `boolean` |          |   false           | 子页面的宿主页面是否是 weex 渲染 | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /><img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" /> |

## 示例
[在线 Demo](https://jsplayground.taobao.org/raxplayground/c5f33524-1a5c-43ed-866d-411d820cce46)
```js
import {createElement, render, Component} from 'rax';
import * as DriverDOM from 'driver-dom';
import * as DriverWeex from 'driver-weex';
import { isWeex } from 'universal-env';
import Embed from '../src/index';

const urlParam = {
  paramOne:123,
  paramTwo:456
};
render(<Embed urlParam={urlParam} src={'http://taobao.com'} useIframeInWeb={true} style={{
  height: 750,
  width: 750
}} />, document.body, { driver:isWeex ? DriverWeex : DriverDOM });
```


