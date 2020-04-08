[![npm](https://img.shields.io/npm/v/rax-link.svg)](https://www.npmjs.com/package/rax-link)

## 描述

Link 是基础的链接组件，同 a 标签。它带有默认样式 textDecoration: 'none'。
在浏览器中，同我们熟悉的 a 标签，使用 Link 标签并不能新开一个 webview ，它只是在当前的 webview 中做页面的跳转。

## 安装

```bash
$ npm install rax-link --save
```

## 属性

注：

1. **支持**列表中的 <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" />代表 Web, <img alt="Weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" />代表 Weex, <img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" />代表阿里小程序, <img alt="wechatMiniprogram" src="https://img.alicdn.com/tfs/TB1slcYdxv1gK0jSZFFXXb0sXXa-200-200.svg" width="25px" height="25px"> 代表微信小程序, <img alt="bytedanceMicroApp" src="https://gw.alicdn.com/tfs/TB1jFtVzO_1gK0jSZFqXXcpaXXa-200-200.svg" width="25px" height="25px"> 代表头条小程序, <img alt="quickApp" src="https://gw.alicdn.com/tfs/TB1MP7EwQT2gK0jSZPcXXcKkpXa-200-200.svg" width="25px" height="25px">代表快应用
2. 小程序中需要通过 miniappHref 传递参数支持跳转，参数以“_跳转类型:目标页面路径_”格式传递，跳转类型支持：

- **navigate（默认值）**：从当前页面，跳转到应用内的某个指定页面
  - 需要跳转的应用内非 tabbar 的目标页面路径 ,路径后可以带参数
  - 参数规则：路径与参数之间使用`?`分隔，参数键与参数值用`=`相连，不同参数必须用`&`分隔
  - 示例： `path?key1=value1&key2=value2`
- **redirect**：关闭当前页面，跳转到应用内的某个指定页面
  - 需要跳转的应用内非 tabbar 的目标页面路径 ,路径后可以带参数
  - 参数规则：路径与参数之间使用`?`分隔，参数键与参数值用 `=` 相连，不同参数必须用`&`分隔
  - 示例：`path?key1=value1&key2=value2`
- **switchTab**：跳转到指定标签页（tabbar）页面，并关闭其他所有非标签页页面
  - 跳转的标签页的路径（需在 `app.json` 的 `tabbar` 字段定义的页面）
  - **注意**：路径后不能带参数。
- **navigateBack**：关闭当前页面，返回上一级或多级页面
  - 与前面三种路由方式不同，navigateBack 跳转类型对应的 `miniappHref` 参数的格式中**目标页面路径**部分所对应的是返回的页面数（例如：`navigateBack:1` 表示返回上一级），如果返回的页面数大于现有打开的页面数，则返回到首页。

| **属性**    | **类型**   | **默认值** | **必填** | **描述**              | **支持**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ----------- | ---------- | ---------- | -------- | --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| onClick     | `function` | -          | false    | 节点被点击之后触发    | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /> <img alt="Weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" /> <img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" /> <img alt="wechatMiniprogram" src="https://img.alicdn.com/tfs/TB1slcYdxv1gK0jSZFFXXb0sXXa-200-200.svg" width="25px" height="25px"> <img alt="bytedanceMicroApp" src="https://gw.alicdn.com/tfs/TB1jFtVzO_1gK0jSZFqXXcpaXXa-200-200.svg" width="25px" height="25px"> <img alt="quickApp" src="https://gw.alicdn.com/tfs/TB1MP7EwQT2gK0jSZPcXXcKkpXa-200-200.svg" width="25px" height="25px">|
| href        | `string`   | -          | true     | 跳转目标地址          | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /> <img alt="Weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" /> <img alt="quickApp" src="https://gw.alicdn.com/tfs/TB1MP7EwQT2gK0jSZPcXXcKkpXa-200-200.svg" width="25px" height="25px">                                                                                                                                                                                                                                                           |
| miniappHref | `string`   | -          | true     | 跳转类型:目标页面路径 | <img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" /> <img alt="wechatMiniprogram" src="https://img.alicdn.com/tfs/TB1slcYdxv1gK0jSZFFXXb0sXXa-200-200.svg" width="25px" height="25px"> <img alt="bytedanceMicroApp" src="https://gw.alicdn.com/tfs/TB1jFtVzO_1gK0jSZFqXXcpaXXa-200-200.svg" width="25px" height="25px">                                                                                                                                                                                                                                               |

## 示例

```jsx
import { createElement, render } from 'rax';
import DriverUniversal from 'driver-universal';
import Link from 'rax-link';
import Text from 'rax-text';

render(
  <Link
    href={'//www.taobao.com'}
    miniappHref={'/pages/Home/index'}
    onClick={e => {
      console.log(e);
    }}
  >
    <Text
      style={{
        fontSize: 14,
        color: '#333333',
      }}
    >
      点击跳转
    </Text>
  </Link>,
  document.body,
  { driver: DriverUniversal },
);
```
