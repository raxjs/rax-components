# Image

[![npm](https://img.shields.io/npm/v/rax-image.svg)](https://www.npmjs.com/package/rax-image)

## 描述

用于展示图片

## 安装

```bash
$ npm install rax-image --save
```

## 引用

```jsx
import Image from 'rax-image';
```

## 属性

注：
1、**支持**列表中的 <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" />代表 Web <img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" />代表 weex <img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" />代表阿里小程序<img alt="wechatMiniprogram" src="https://img.alicdn.com/tfs/TB1slcYdxv1gK0jSZFFXXb0sXXa-200-200.svg" width="25px" height="25px">代表微信小程序

| **属性**       | **类型**                                          | **默认值**  | **必填** | **描述**                                                                                | **支持**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| -------------- | ------------------------------------------------- | ----------- | -------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| source         | `object: {uri: string}`                           | -           | true     | 设置图片的 uri                                                                          | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /><img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" /><img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" /><img alt="wechatMiniprogram" src="https://img.alicdn.com/tfs/TB1slcYdxv1gK0jSZFFXXb0sXXa-200-200.svg" width="25px" height="25px"> |
| style          | `object: { width: number height: number }`        | -           | true     | 图片样式 width 和 height 为必填属性，否则图片无法正常展示，可以补充其他属性             | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /><img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" /><img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" /><img alt="wechatMiniprogram" src="https://img.alicdn.com/tfs/TB1slcYdxv1gK0jSZFFXXb0sXXa-200-200.svg" width="25px" height="25px"> |
| fallbackSource | `object: {uri: string}`                           | -           | false    | 备用图片的 uri（当主图加载失败是加载）                                                  | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /><img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" />                                                                                                                                                                                                                                                          |
| resizeMode     | `string： 'contain' 'cover' 'stretch'`            | -           | false    | 决定当组件尺寸和图片尺寸不成比例的时候如何调整图片的大小                                | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /><img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" />                                                                                                                                                                                                                                                          |
| mode           | String:                                           | scaleToFill | false    | 小程序中的[图片模式](https://docs.alipay.com/mini/component/image)，可选项更多          | <img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" /><img alt="wechatMiniprogram" src="https://img.alicdn.com/tfs/TB1slcYdxv1gK0jSZFFXXb0sXXa-200-200.svg" width="25px" height="25px">                                                                                                                                                                                                                                              |
| quality        | `string: 'original' 'normal' 'low' 'high' 'auto'` | -           | false    | 图片质量                                                                                | <img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" />                                                                                                                                                                                                                                                                                                                                                                                  |
| placeholder    | `string`                                          | -           | false    | 占位图的 URL，在图片下载过程中将展示占位图， 图片下载完成后将显示 source 中指定的图片。 | <img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" />                                                                                                                                                                                                                                                                                                                                                                                  |
| onClick        | `function`                                        | -           | false    | 点击图片时的回调函数                                                                    | <img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" /><img alt="wechatMiniprogram" src="https://img.alicdn.com/tfs/TB1slcYdxv1gK0jSZFFXXb0sXXa-200-200.svg" width="25px" height="25px">                                                                                                                                                                                                                                              |
| onLoad         | `function`                                        | -           | false    | 图片加载成功的回调函数                                                                  | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /><img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" /><img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" /><img alt="wechatMiniprogram" src="https://img.alicdn.com/tfs/TB1slcYdxv1gK0jSZFFXXb0sXXa-200-200.svg" width="25px" height="25px"> |
| onError        | `function`                                        | -           | false    | 图片加载失败的回调函数                                                                  | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /><img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" /><img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" /><img alt="wechatMiniprogram" src="https://img.alicdn.com/tfs/TB1slcYdxv1gK0jSZFFXXb0sXXa-200-200.svg" width="25px" height="25px"> |

### onLoad onError 返回

当完成图片加载成功/失败时，将分别触发 onLoad/onError 中的回调函数 function(event) => {}

weex 下（iOS/Android）

| **成员**           | **类型**  | **描述**                                            |
| ------------------ | --------- | --------------------------------------------------- |
| success            | `boolean` | 标记图片是否成功加载，成功为 1/true，失败为 0/false |
| size               | `object`  | 加载的图片大小对象                                  |
| size.naturalWidth  | `number`  | 图片宽度，如果图片加载失败则为 0/-1                 |
| size.naturalHeight | `number`  | 图片高度，如果图片加载失败则为 0/-1                 |

Web 下是 web 原生的 Event 事件

| **成员**             | **类型** | **描述**     |
| -------------------- | -------- | ------------ |
| target               | `dom`    | 图片自身元素 |
| target.naturalWidth  | `number` | 图片宽度     |
| target.naturalHeight | `number` | 图片高度     |

小程序下

| 成员          | 类型     | 描述             |
| ------------- | -------- | ---------------- |
| type          | `string` | 事件类型         |
| detail        | `object` | 点击位置信息     |
| target        | `object` | 点击对象属性信息 |
| currentTarget | `object` | 同上             |

## 示例

### 普通示例

```jsx
import { createElement, render } from 'rax';
import DriverUniversal from 'driver-universal';
import Image from '../src/index';

const App = () => {
  const imageRef = useRef(null);
  return (
    <Image
      ref={imageRef}
      source={{
        uri: 'https://gw.alicdn.com/tfs/TB1bBD0zCzqK1RjSZFpXXakSXXa-68-67.png',
      }}
      style={{
        height: '68rpx',
        width: '67rpx',
      }}
    />
  );
};

render(<App />, document.body, { driver: DriverUniversal });
```

### 使用 fallbackSource 和 resizeMode

```jsx
import { createElement, render } from 'rax';
import DriverUniversal from 'driver-universal';
import Image from '../src/index';

const App = () => {
  return (
    <Image
      source={{
        uri:
          'https://gw.alicdn.com/tfs/TB1g6AvPVXXXXa7XpXXXXXXXXXX-215-215.png',
      }}
      fallbackSource={{
        uri:
          'https://gw.alicdn.com/tps/i3/TB1yeWeIFXXXXX5XFXXuAZJYXXX-210-210.png_70x70.jpg',
      }}
      style={{
        width: '100rpx',
        height: '100rpx',
      }}
      resizeMode="cover"
    />
  );
};

render(<App />, document.body, { driver: DriverUniversal });
```
