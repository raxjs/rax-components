# rax-qrcode [![npm](https://img.shields.io/npm/v/rax-qrcode.svg)](https://www.npmjs.com/package/rax-qrcode)

**描述：**
QRCode 是一个用于生成二维码的 Rax 组件

## 安装

```bash
$ npm install rax-qrcode --save
```

## 属性

注：
1、**支持**列表中的 <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" />代表 h5 <img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" />代表 weex <img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" />代表小程序

| **属性** | **类型** | **默认值** | **必填** | **描述**             | **支持**                                                                                                                                                                                                                                                                                                                                                                |
| -------- | -------- | ---------- | -------- | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| data     | `string` | -          | true     | 二维码承载的数据内容 | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /> <img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" /> <img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" /> |
| style    | `number` | -          | false    | 自定义样式           | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /> <img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" /> <img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" /> |
| options  | `object` | -          | false    | 二维码生成器配置项   | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /> <img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" /> <img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" /> |

### options 详解

| **属性**          | **类型** | **默认值** | **必填** | **描述**                                                                                                              |
| ----------------- | -------- | ---------- | -------- | --------------------------------------------------------------------------------------------------------------------- |
| errorCorrectLevel | `number` | -          | false    | 容错级别，可设置为：`QRCode.CorrectLevel.L`，`QRCode.CorrectLevel.M`，`QRCode.CorrectLevel.Q`，`QRCode.CorrectLevel.` |
| typeNumber        | `number` | -          | false    | 自定义样式                                                                                                            |
| blankColor        | `string` | -          | false    | 空白处颜色                                                                                                            |
| fillColor         | `string` | -          | false    | 数据块填充色                                                                                                          |

## 示例

[在线 Demo](https://jsplayground.taobao.org/raxplayground/5ca6f6df-7d45-46e5-9268-59fc91be4087)

```jsx
import { createElement, render } from "rax";
import DU from "driver-universal";
import View from "rax-view";
import QRCode from "rax-qrcode";

function App() {
  return (
    <View style={{ flex: 1 }}>
      <QRCode
        data="http://market.m.taobao.com/apps/market/m-vip/88-festival.html?wh_weex=true&wx_navbar_transparent=true"
        style={{ width: 400, height: 400 }}
      />
      <QRCode
        data="http://market.m.taobao.com/apps/market/m-vip/88-festival.html?wh_weex=true&wx_navbar_transparent=true"
        options={{ fillColor: "red", blankColor: "#000" }}
      />
    </View>
  );
}

render(<App />, document.body, { driver: DU });
```
