# rax-slider

[![npm](https://img.shields.io/npm/v/rax-slider.svg)](https://www.npmjs.com/package/rax-slider)

> Web 场景推荐使用 [rax-swiper](https://github.com/raxjs/rax-components/blob/master/packages/rax-swiper/README.md)
>
> rax-slider 由于历史原因，可能存在一些问题，非内联样式场景强烈推荐使用 [rax-swiper](https://github.com/raxjs/rax-components/blob/master/packages/rax-swiper/README.md)！

## 支持

Web / Weex / 阿里小程序 / 微信小程序 / 字节跳动小程序

## 描述

轮播组件，就是以幻灯片的方式，在页面中横向展示诸多内容的组件。 轮播内容相互独立，前后在内容以及数据上都不存在逻辑关系。

## 安装

```bash
$ npm install rax-slider --save
```

## 属性

1. Web 环境中 slider 内部默认做了节点的懒加载渲染，不再需要使用 picture 的`lazyload`做懒加载
2. `paginationStyle`中`itemColor` 用来定义分页原点的颜色，`itemSelectedColor` 用来定义分页原点激活时的颜色，`itemSize`用来定义分页圆点的大小，小程序只支持设置 `itemColor` `用来定义分页原点的颜色，itemSelectedColor`。快应用只支持`itemColor`、`itemSelectedColor`、`itemSize`三个用来定义分页圆点的样式。默认样式如下：

```js
{
  position: 'absolute',
  width: '40rpx',
  height: '40rpx',
  bottom: '20rem',
  left: 0,
  itemColor: 'rgba(255, 255, 255, 0.5)',
  itemSelectedColor: 'rgb(255, 80, 0)',
  itemSize: '8rpx'
}
```

| **属性**         | **类型**   | **默认值** | **必填** | **描述**                                    | **支持**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ---------------- | ---------- | ---------- | -------- | ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| width            | `string`   | -          | 是       | Slider 的宽度                               | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /> <img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" /> <img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" /> <img alt="wechatMiniprogram" src="https://img.alicdn.com/tfs/TB1slcYdxv1gK0jSZFFXXb0sXXa-200-200.svg" width="25px" height="25px"><img alt="bytedanceMicroApp" src="https://gw.alicdn.com/tfs/TB1jFtVzO_1gK0jSZFqXXcpaXXa-200-200.svg" width="25px" height="25px" /><img alt="quickApp" src="https://gw.alicdn.com/tfs/TB1MP7EwQT2gK0jSZPcXXcKkpXa-200-200.svg" width="25px" height="25px">  |
| height           | `string`   | -          | 是       | Slider 的高度                               | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /> <img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" /> <img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" /> <img alt="wechatMiniprogram" src="https://img.alicdn.com/tfs/TB1slcYdxv1gK0jSZFFXXb0sXXa-200-200.svg" width="25px" height="25px"><img alt="bytedanceMicroApp" src="https://gw.alicdn.com/tfs/TB1jFtVzO_1gK0jSZFqXXcpaXXa-200-200.svg" width="25px" height="25px" /><img alt="quickApp" src="https://gw.alicdn.com/tfs/TB1MP7EwQT2gK0jSZPcXXcKkpXa-200-200.svg" width="25px" height="25px">  |
| autoPlay         | `boolean`  | false      | 否       | 是否自动播放                                | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /> <img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" /> <img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" /> <img alt="wechatMiniprogram" src="https://img.alicdn.com/tfs/TB1slcYdxv1gK0jSZFFXXb0sXXa-200-200.svg" width="25px" height="25px"><img alt="bytedanceMicroApp" src="https://gw.alicdn.com/tfs/TB1jFtVzO_1gK0jSZFqXXcpaXXa-200-200.svg" width="25px" height="25px" /><img alt="quickApp" src="https://gw.alicdn.com/tfs/TB1MP7EwQT2gK0jSZPcXXcKkpXa-200-200.svg" width="25px" height="25px">  |
| showsPagination  | `boolean`  | true       | 否       | 是否显示指示点                              | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /> <img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" /> <img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" /> <img alt="wechatMiniprogram" src="https://img.alicdn.com/tfs/TB1slcYdxv1gK0jSZFFXXb0sXXa-200-200.svg" width="25px" height="25px"><img alt="bytedanceMicroApp" src="https://gw.alicdn.com/tfs/TB1jFtVzO_1gK0jSZFqXXcpaXXa-200-200.svg" width="25px" height="25px" />                                                                                                                         |
| paginationStyle  | `object`   | -          | 否       | 自己定义指示点的样式，否则默认样式居中      | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /> <img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" /> <img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" /> <img alt="wechatMiniprogram" src="https://img.alicdn.com/tfs/TB1slcYdxv1gK0jSZFFXXb0sXXa-200-200.svg" width="25px" height="25px"><img alt="bytedanceMicroApp" src="https://gw.alicdn.com/tfs/TB1jFtVzO_1gK0jSZFqXXcpaXXa-200-200.svg" width="25px" height="25px" />                                                                                                                         |
| loop             | `boolean`  | true       | 否       | 是否是循环播放                              | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /> <img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" /> <img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" /> <img alt="wechatMiniprogram" src="https://img.alicdn.com/tfs/TB1slcYdxv1gK0jSZFFXXb0sXXa-200-200.svg" width="25px" height="25px"><img alt="bytedanceMicroApp" src="https://gw.alicdn.com/tfs/TB1jFtVzO_1gK0jSZFqXXcpaXXa-200-200.svg" width="25px" height="25px" /> <img alt="quickApp" src="https://gw.alicdn.com/tfs/TB1MP7EwQT2gK0jSZPcXXcKkpXa-200-200.svg" width="25px" height="25px"> |
| index            | `number`   | 0          | 否       | 指定默认初始化第几页                        | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /> <img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" /> <img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" /> <img alt="wechatMiniprogram" src="https://img.alicdn.com/tfs/TB1slcYdxv1gK0jSZFFXXb0sXXa-200-200.svg" width="25px" height="25px"><img alt="bytedanceMicroApp" src="https://gw.alicdn.com/tfs/TB1jFtVzO_1gK0jSZFqXXcpaXXa-200-200.svg" width="25px" height="25px" />                                                                                                                         |
| autoPlayInterval | `number`   | 3000       | 否       | 自动播放的间隔时间                          | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /> <img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" /> <img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" /> <img alt="wechatMiniprogram" src="https://img.alicdn.com/tfs/TB1slcYdxv1gK0jSZFFXXb0sXXa-200-200.svg" width="25px" height="25px"><img alt="bytedanceMicroApp" src="https://gw.alicdn.com/tfs/TB1jFtVzO_1gK0jSZFqXXcpaXXa-200-200.svg" width="25px" height="25px" />                                                                                                                         |
| onChange         | `function` | -          | 否       | `index` 改变时会触发                        | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /> <img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" /> <img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" /> <img alt="wechatMiniprogram" src="https://img.alicdn.com/tfs/TB1slcYdxv1gK0jSZFFXXb0sXXa-200-200.svg" width="25px" height="25px"><img alt="bytedanceMicroApp" src="https://gw.alicdn.com/tfs/TB1jFtVzO_1gK0jSZFqXXcpaXXa-200-200.svg" width="25px" height="25px" /> <img alt="quickApp" src="https://gw.alicdn.com/tfs/TB1MP7EwQT2gK0jSZPcXXcKkpXa-200-200.svg" width="25px" height="25px"> |
| direction        | `string`   | horizontal | 否       | Slider 滚动方向 (`horizontal` / `vertical`) | <img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" /> <img alt="wechatMiniprogram" src="https://img.alicdn.com/tfs/TB1slcYdxv1gK0jSZFFXXb0sXXa-200-200.svg" width="25px" height="25px"><img alt="bytedanceMicroApp" src="https://gw.alicdn.com/tfs/TB1jFtVzO_1gK0jSZFqXXcpaXXa-200-200.svg" width="25px" height="25px" /> <img alt="quickApp" src="https://gw.alicdn.com/tfs/TB1MP7EwQT2gK0jSZPcXXcKkpXa-200-200.svg" width="25px" height="25px">                                                                                                                                                                                                                                                |

## 方法

### `Slider.slideTo(index: number)`

#### 参数

| **属性** | **类型** | **默认值** | **必填** | **描述**              |
| -------- | -------- | ---------- | -------- | --------------------- |
| index    | `number` | -          | 是       | 滚动到指定索引的 View |

## Slider.Item

每一个需要被轮播的子元素需要被包裹在 `Slider.Item` 组件中，在 Weex 和 Web 该组件是 `Fragment` 空节点，在小程序该组件是 `swiper-item`。由于该节点没有实际意义，所以不要在该组件上设置样式和绑定事件。 如果只在 Web 和 Weex 中使用，每一个需要轮播的子项**无需**包裹 `Slider.Item` 组件。

## 示例

```jsx
import { createElement, Component, render, createRef } from 'rax';
import View from 'rax-view';
import Image from 'rax-image';
import Slider from 'rax-slider';
import DriverUniversal from 'driver-universal';

class App extends Component {
  constructor(props) {
    super(props);

    this.inputRef = createRef();
  }

  onchange = (index) => {
    console.log('change', index);
  };

  onClick = () => {
    this.inputRef.current.slideTo(0);
  };

  render() {
    return (
      <View>
        <Slider
          className="slider"
          width="750"
          height="500"
          style={styles.slider}
          autoPlay={true}
          loop={true}
          showsPagination={true}
          paginationStyle={styles.paginationStyle}
          autoplayTimeout={3000}
          onChange={this.onchange}
          ref={this.inputRef}
        >
          <Slider.Item>
            <View style={styles.itemWrap}>
              <Image
                style={styles.image}
                source={{
                  height: 500,
                  width: 375,
                  uri: '//gw.alicdn.com/tfs/TB19NbqKFXXXXXLXVXXXXXXXXXX-750-500.png',
                }}
              />
            </View>
          </Slider.Item>
          <Slider.Item>
            <View style={styles.itemWrap}>
              <Image
                style={styles.image}
                source={{
                  height: 500,
                  width: 375,
                  uri: '//gw.alicdn.com/tfs/TB1tWYBKFXXXXatXpXXXXXXXXXX-750-500.png',
                }}
              />
            </View>
          </Slider.Item>
          <Slider.Item>
            <View style={styles.itemWrap}>
              <Image
                style={styles.image}
                source={{
                  height: 500,
                  width: 375,
                  uri: '//gw.alicdn.com/tfs/TB1SX_vKFXXXXbyXFXXXXXXXXXX-750-500.png',
                }}
              />
            </View>
          </Slider.Item>
        </Slider>

        <View onClick={this.onClick}>Click</View>
      </View>
    );
  }
}

const styles = {
  slider: {
    width: 750,
    position: 'relative',
    overflow: 'hidden',
    height: 500,
    backgroundColor: '#cccccc',
  },
  itemWrap: {
    width: 750,
    height: 500,
  },
  image: {
    width: 750,
    height: 500,
  },
  button: {
    marginTop: 20,
    width: 340,
    height: 80,
  },
  paginationStyle: {
    position: 'absolute',
    width: 750,
    height: 40,
    bottom: 20,
    left: 0,
    itemColor: 'rgba(255, 255, 255, 0.5)',
    itemSelectedColor: 'rgb(255, 80, 0)',
    itemSize: 16,
  },
};

render(<App />, document.body, { driver: DriverUniversal });
```
