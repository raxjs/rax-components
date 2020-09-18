[![npm](https://img.shields.io/npm/v/rax-embed.svg)](https://www.npmjs.com/package/rax-embed)
# rax-embed

## 支持
Web / Weex / 阿里小程序 / 微信小程序 / 字节跳动小程序

## 描述
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
小程序中使用 webview 实现，默认会全屏覆盖当前页面，不能设置样式和透明度

| **属性**    | **类型**   | **默认值** | **必填** | **描述**           | **支持** |
| ----------- | ---------- | ---------- | ------------ | ------------------ | ------------ |
| style     | `object` | {}         |   false           | 样式描述 | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /> <img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" /> |
| src     | `string` | ''         |   false           | 嵌入的页面地址 | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /> <img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" /><img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" /> <img alt="wechatMiniprogram" src="https://img.alicdn.com/tfs/TB1slcYdxv1gK0jSZFFXXb0sXXa-200-200.svg" width="25px" height="25px"> <img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1jFtVzO_1gK0jSZFqXXcpaXXa-200-200.svg" width="25px" height="25px" />   |
| urlParam     | `string/object` | ''         |   false           | 传递给子页面的参数 | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /> <img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" /><img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" /> <img alt="wechatMiniprogram" src="https://img.alicdn.com/tfs/TB1slcYdxv1gK0jSZFFXXb0sXXa-200-200.svg" width="25px" height="25px"> <img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1jFtVzO_1gK0jSZFqXXcpaXXa-200-200.svg" width="25px" height="25px" />   |
| _page_inside_embed_     | `boolean` | true         |   false           | 页面是否在embed中 | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /> <img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" /> |
| _page_home_isweex_     | `boolean` |          |   false           | 子页面的宿主页面是否是 weex 渲染 | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /> <img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" />  |

## 示例

```js
import { createElement, render } from 'rax';
import DriverUniversal from 'driver-universal';
import Embed from '../src/index';

const urlParam = {
  paramOne: 123,
  paramTwo: 456
};
render(<Embed urlParam={urlParam} src={'http://taobao.com'} useIframeInWeb={true} style={{
  height: '750rpx',
  width: '750rpx'
}} />, document.body, { driver: DriverUniversal });
```


