[![npm](https://img.shields.io/npm/v/rax-icon.svg)](https://www.npmjs.com/package/rax-icon)

## 支持

Web / Weex

## 描述

图标组件，实现了 W3C 标准的 IconFont 接口。

## 安装

```bash
$ npm install rax-icon --save
```

## 属性

1、**支持**列表中的 <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" />代表h5 <img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" />代表weex  <img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" />代表小程序


| **属性**    | **类型**   | **默认值** | **必填** | **描述**           | **支持** |
| ----------- | ---------- | ---------- | ------------ | ------------------ | ------------ |
| source.uri     | `String` | -          |      是        | 图片型icon的url，如果出现，则font和codePoint两个属性失效 | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /><img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" />  |
| fontFamily | `String` | -          |     是         | iconfont的字体         | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /><img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" />     |
| source.codePoint     | `String` | -          |  是       |    iconfont的码点                     | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /><img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" />           |   

## 方法

### `IconComponent createIconSet(Object map, String name, String url);`

#### 参数
| **属性** | **类型** | **默认值** | **必填** | **描述**            | 
| -------- | -------- | ---------- | ------------ | ------------------- |
| map  | `Object` | -          | 是           | 描述字符集映射，eg：{ hello: '\ue60f' }            | 
| name | `String` | -       | 是        | 字体名称 | 
| url | `String` | -       | 是       | 字体文件的 URL | 

#### 返回

| **属性** | **类型** | **默认值** | **必填** | **描述**            | 
| -------- | -------- | ---------- | ------------ | ------------------- |
| name  | `String` | -          | 否           | 字符的名称            | 
| codePoint | `String` | -       | 否        | iconfont 的码点 | 

## 示例
```js
import { createElement, render, Component } from 'rax';
import DU from 'driver-universal';
import View from 'rax-view';
import Icon, { createIconSet } from '../src/index';

const IconFont1 = createIconSet({}, 'iconfont', 'https://at.alicdn.com/t/font_pkm0oq8is8fo5hfr.ttf');
const IconFont2 = createIconSet({
  hello: '\uE60f'
}, 'iconfont', 'https://at.alicdn.com/t/font_pkm0oq8is8fo5hfr.ttf');
const icon = 'https://gw.alicdn.com/tfs/TB1KRRuQXXXXXbwapXXXXXXXXXX-200-200.png';

class Demo extends Component {
  render() {
    return (
      <View>
        <Icon source={{uri: icon}}/>
        <Icon fontFamily="iconfont" source={{uri: 'https://at.alicdn.com/t/font_pkm0oq8is8fo5hfr.ttf', codePoint: '\uE60f'}}/>
        <IconFont1 codePoint={'\uE60f'}/>
        <IconFont2 name={'hello'}/>
      </View>
    );
  }
}

render(<Demo />, document.body, { driver: DU });
```