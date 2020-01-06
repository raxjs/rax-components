# Picture

[![npm](https://img.shields.io/npm/v/rax-picture.svg)](https://www.npmjs.com/package/rax-picture)

## 安装

```bash
$ npm install rax-picture --save
```

## 引用

```jsx
import Picture from 'rax-picture';
```

## 属性

注：
1、**支持**列表中的 <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" />代表h5 <img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" />代表weex  <img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" />代表小程序

| **属性**    | **类型**   | **默认值** | **必填** | **描述**           | **支持** |
| ----------- | ---------- | ---------- | ------------ | ------------------ | ------------ |
| source | `Object: {uri: String}` | - |   true | 设置图片的 uri | ALL |
| style | `Object: { width: Number height: Number }` | - | true | 图片样式 width和height为必填属性，否则图片无法正常展示，可以补充其他属性| ALL |
| fallbackSource | `Object: {uri: String}` | - | false | 备用图片的uri（当主图加载失败是加载） | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /> <img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" /> |
| resizeMode | `String： 'contain' 'cover' 'stretch'` | - | false | 决定当组件尺寸和图片尺寸不成比例的时候如何调整图片的大小 | ALL |
| quality | `String: 'original' 'normal' 'low' 'high' 'auto'` | - | false | 图片质量 | <img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" />|
| placeholder | `String` | - | false | 懒加载时的占位 URL，在图片下载过程中将展示占位图，图片下载完成后将显示source中指定的图片。 | <img alt="weex" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /> <img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" />|
| lazyload | `Boolean` | true | false | web端有效，根据图像是否在可视范围内延迟加载图像，Web 端需引入 `//g.alicdn.com/kg/appear/0.2.2/appear.min.js` 脚本 | <img alt="weex" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" />|
| autoPixelRatio | `Boolean` | true | false | web端有效，在高分辨率下使用二倍图 | <img alt="weex" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" />|
| autoRemoveScheme | `Boolean` | true | false | web端有效,图像 URL 自动删除协议头 | <img alt="weex" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" />|
| autoReplaceDomain | `Boolean` | true | false | web端有效 图像 URL 域名替换成 gw.alicdn.com | <img alt="weex" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" />|
| autoScaling | `Boolean` | true | false | web端有效, 为图像 URL 添加缩放后缀，将会根据 style 内的 width 属性添加缩放后缀 | <img alt="weex" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" />|
| autoWebp | `Boolean` | true | false | web端有效，添加 webp 后缀 | <img alt="weex" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" />|
| autoCompress | `Boolean` | true | false | web端有效, 添加质量压缩后缀 | <img alt="weex" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" />|
| compressSuffix | `Array<string>` | ['q75', 'q50'] | false | web端有效, 图像质量压缩后缀规则 | <img alt="weex" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" />|
| highQuality | `Boolean` | true | false | web端有效， 使用高质量的压缩后缀 | <img alt="weex" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" />|
| ignoreGif | `Boolean` | true | false | web端有效，所有针对 URL 的优化是否忽略 gif 格式的图像，默认忽略 | <img alt="weex" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" />|
| onLoad | `Function` | - | false | 图片加载成功的回调函数 | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /> <img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" /><img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" /> |
| onError | `Function` | - | false | 图片加载失败的回调函数 | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /> <img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" /><img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" /> |

### onLoad onError 返回

当完成图片加载成功/失败时，将分别触发 `onLoad/onError` 中的回调函数 `function(event) => {}` Weex 下（iOS/Android）

| **成员** | **类型** | **描述** |
| --- | --- | --- |
| success | `boolean` | 标记图片是否成功加载，成功为1/true，失败为0/false |
| size | `object` |  加载的图片大小对象 |
| size.naturalWidth | `number` |  图片宽度，如果图片加载失败则为0/-1 |
| size.naturalHeight | `number` |  图片高度，如果图片加载失败则为0/-1 |

H5 下是 Web 原生的Event事件

| **成员** | **类型** | **描述** |
| --- | --- | --- |
| target | `Dom` | 图片自身元素 |
| target.naturalWidth | `number` |  图片宽度 |
| target.naturalHeight | `number` |  图片高度 |

## 示例

```jsx
import { createElement, render } from 'rax';
import Picture from 'rax-picture';

const App = () => {
  return (
    <Picture
      source={{
        uri: 'https://gw.alicdn.com/tfs/TB1bBD0zCzqK1RjSZFpXXakSXXa-68-67.png',
      }}
      style={{
        width: 68,
        height: 68
      }}
    />
  );
}
```
