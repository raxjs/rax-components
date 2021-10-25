# rax-recyclerview

[![npm](https://img.shields.io/npm/v/rax-recyclerview.svg)](https://www.npmjs.com/package/rax-recyclerview)

## 描述

在 `ScrollView` 的基础上，按需渲染视图内的元素，并回收视图外元素，以优化长列表场景下的性能优化。在 Weex 下是对 `list` 与 `cell` 的包装，其具有复用内部组件来提供性能的机制。

使用时，如果为垂直方向滚动时，**必须设置高度**，否则元素回收功能和滚动相关的功能将失效。

![](https://gw.alicdn.com/tfs/TB1Cf_ZRVXXXXa8XVXXXXXXXXXX-255-265.gif)

## 安装

```bash
npm install rax-recyclerview --save
```

## 属性

在 rax-recyclerview@2.0.0 及以上版本中，可以使用所有 rax-scrollview 的所有属性，具体文档请看：[rax-scrollview](https://github.com/raxjs/rax-components/blob/master/packages/rax-scrollview/README.md)

| 属性                  | 类型              | 默认值 | 必填 | 描述                                            | 支持                                                         |
| --------------------- | ----------------- | ------ | ---- | ----------------------------------------------- | ------------------------------------------------------------ |
| itemSize              | `function/number` | -      |   √  | 单位为`rpx`, 返回每个子元素的高度(节点回收时需要，不需要传递 RecyclerView.Header 元素的高度)，若 itemSize 未传，则不进行回收。 如果每个子元素的高度不固定，则可使用函数的方式，例如 itemSize={(index) => {return 100;}} 其中 `index` 为参与回收的子元素的数组下标位置           | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /> |
| horizontal                     | `boolean`  | -          | false    | 设置为横向滚动                                                    | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /> <img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" /><img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" /> <img alt="wechatMiniprogram" src="https://img.alicdn.com/tfs/TB1slcYdxv1gK0jSZFFXXb0sXXa-200-200.svg" width="25px" height="25px"><img alt="bytedanceMicroApp" src="https://gw.alicdn.com/tfs/TB1jFtVzO_1gK0jSZFqXXcpaXXa-200-200.svg" width="25px" height="25px" /> <img alt="quickApp" src="https://gw.alicdn.com/tfs/TB1MP7EwQT2gK0jSZPcXXcKkpXa-200-200.svg" width="25px" height="25px">|
| onEndReachedThreshold | `string/number`          | 500    | ✘    | 设置加载更多的偏移, 推荐使用 string 格式来指指定尺寸单位，如`100rpx`                              | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /> <img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" /> <img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" /><img alt="bytedanceMicroApp" src="https://gw.alicdn.com/tfs/TB1jFtVzO_1gK0jSZFqXXcpaXXa-200-200.svg" width="25px" height="25px"> |
| onEndReached          | `function`        | -      | ✘    | 滚动区域还剩`onEndReachedThreshold`的长度时触发 | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" />  <img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" /> <img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" /> <img alt="wechatMiniprogram" src="https://img.alicdn.com/tfs/TB1slcYdxv1gK0jSZFFXXb0sXXa-200-200.svg" width="25px" height="25px"><img alt="bytedanceMicroApp" src="https://gw.alicdn.com/tfs/TB1jFtVzO_1gK0jSZFqXXcpaXXa-200-200.svg" width="25px" height="25px"> |
| onScroll              | `function`        | -      | ✘    | 滚动时触发的事件，返回当前滚动的水平垂直距离    | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" />  <img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" /> <img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" /> <img alt="wechatMiniprogram" src="https://img.alicdn.com/tfs/TB1slcYdxv1gK0jSZFFXXb0sXXa-200-200.svg" width="25px" height="25px"><img alt="bytedanceMicroApp" src="https://gw.alicdn.com/tfs/TB1jFtVzO_1gK0jSZFqXXcpaXXa-200-200.svg" width="25px" height="25px"> |
| totalSize             | `number`          | -      | ✘    | 当前列表总高度(在 cell 高度可变的列表中需要传)  | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /> |
| onTouchStart                      | `function` | -          | false    | touchStart触发的事件，返回触摸点数据（touches、changedTouches）                      | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /> <img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" /><img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" />  |
| onTouchMove                      | `function` | -          | false    | touchMove触发的事件，返回触摸点数据（touches、changedTouches）                      | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /> <img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" /><img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" />  |
| onTouchEnd                     | `function` | -          | false    | touchEnd触发的事件，返回触摸点数据（touches、changedTouches）                      | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /> <img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" /><img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" />  |
| onTouchCancel                    | `function` | -          | false    | touchCancel触发的事件，返回触摸点数据（touches、changedTouches）                      | <img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" />  |
| disableScroll                  | `boolean`  | -          | false    | 是否禁止滚动，是否禁止滚动, rax-recyclerview@1.3.4 及以上版本支                             | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /> <img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" />      |

## 子组件
### RecyclerView.Header

头部子元素需要用 `RecycerView.Header` 包裹，头部元素**不参与**元素回收。

### RecyclerView.Cell

除了头部元素之外的子元素可以被 `RecyclerView.Cell` 包裹，在 Weex 中该组件为 Weex 的 `cell` 组件，在 Web 和小程序中该组件是 `Fragment` 空节点。该节点没有实际意义，所以不要在该组件上设置样式和绑定事件。如果在 Web 和 小程序中使用，不需要包裹 `RecyclerView.Cell`。

## 方法
### scrollTo({x:number|string,y:number|string})

#### 参数

参数为 `object`，包含以下属性

| **属性** | **类型** | **默认值** | **必填** | **描述**     |
| -------- | -------- | ---------- | -------- | ------------ |
| x        | `number/string` | -          | ✘        | 横向的偏移量, 推荐使用 string 格式来指定尺寸单位 |
| y        | `number/string` | -          | ✘        | 纵向的偏移量, 推荐使用 string 格式来指定尺寸单位 |

### 示例

```jsx
import { createElement, Component, render, useRef } from "rax";

import View from "rax-view";

import Text from "rax-text";

import DriverUniversal from "driver-universal";

import RecyclerView from "rax-recyclerview";

function Thumb({val}) {
  return (
    <RecyclerView.Cell>
      <View style={styles.button}>
        <View style={styles.box}>{val}</View>
      </View>
    </RecyclerView.Cell>
  );
}
let THUMBS = [];
for (let i = 0; i < 100; i++) THUMBS.push(`box_${i}`);
let createThumbRow = (val) => <Thumb key={val} val={val} />;

function App() {
  const viewRef = useRef(null);

  return (
    <View style={styles.root}>
      <RecyclerView
        ref={viewRef}
        style={styles.container}
        itemSize={88}
        onScroll={(e) => {console.log(e.nativeEvent.contentOffset.y)}}
      >
        <RecyclerView.Header style={styles.sticky}>
          <Text>Sticky view is not header</Text>
        </RecyclerView.Header>
        <RecyclerView.Header>
          <View style={styles.sticky}>
            <Text>Sticky view must in header root</Text>
          </View>
        </RecyclerView.Header>
        {THUMBS.map(createThumbRow)}
      </RecyclerView>
      <View
        style={styles.fixButton}
        onClick={() => viewRef.current.scrollTo({ y: 0 })}
      >
        <Text>Scroll to top</Text>
      </View>
    </View>
  );
}

let styles = {
  root: {
    display: 'block'
  },
  sticky: {
    position: 'sticky',
    width: 750,
    top: 0,
    backgroundColor: '#cccccc'
  },
  container: {
    height: '100vh'
  },
  button: {
    margin: 7,
    padding: 5,
    alignItems: 'center',
    backgroundColor: '#eaeaea',
    borderRadius: 3,
  },
  box: {
    width: 64,
    height: 64,
  },
  fixButton: {
    position: 'fixed',
    bottom: 20,
    right: 20,
    border: 1,
    backgroundColor: '#fff'
  }
};

render(<App />, document.body, { driver: DriverUniversal });

```


