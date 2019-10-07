[![npm](https://img.shields.io/npm/v/rax-canvas.svg)](https://www.npmjs.com/package/rax-canvas)
**描述：**
Rax canvas api.

> 在weex上依赖 [gcanvas](https://github.com/weex-plugins/weex-plugin-gcanvas)
> 在小程序中依赖 [canvas](https://docs.alipay.com/mini/component/canvas)
> 在weex和h5中需要通过ref获取canvas实例，在小程序中需要通过id获取

## 安装

```bash
$ npm install rax-canvas --save
```

## 引用

```jsx
import Canvas from 'rax-canvas';
```
## 属性
注：
1、**支持**列表中的 <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" />代表h5 <img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" />代表weex  <img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" />代表小程序

|**属性**| **类型** | **默认值** | **必填** | **描述**           | **支持** |
| ----------- | ---------- | ---------- | ------------ | ------------------ | ------------ |
| style | `object` |  -  | true |通过style中的width和height指定canvas的高、宽|<img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /> <img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" /><img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" />|
## 方法
获取到canvas示例后，具备canvas的通用方法
## 示例
[在线 Demo](https://jsplayground.taobao.org/raxplayground/ad464789-0503-4c6d-9e3c-4b9794b74809)
```jsx
import { createElement, Component, render, createRef } from 'rax';
import Canvas from 'rax-canvas';
import DU from "driver-universal"

class CanvasSample extends Component {
  constructor(props) {
    super(props);
    this.raxCanvasDemo = createRef()
  }
  componentDidMount() {
    const context = this.raxCanvasDemo.current.getContext();
    context.fillStyle = 'red';
    context.fillRect(0, 0, 100, 100);
  }

  render() {
    return <Canvas style={{
      width: 750,
      height: 750
    }} ref={this.raxCanvasDemo} />;
  }
}

render(<CanvasSample />, document.body, { driver: DU });
```


