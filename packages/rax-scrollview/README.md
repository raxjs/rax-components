# rax-scrollview

[![npm](https://img.shields.io/npm/v/rax-scrollview.svg)](https://www.npmjs.com/package/rax-scrollview)

## 支持
Web / Weex / 阿里小程序 / 微信小程序 / 字节跳动小程序

## 描述

ScrollView 是一个包装了滚动操作的组件。一般情况下需要一个确定的高度来保证 ScrollView 的正常展现。

## 安装

```bash
$ npm install rax-scrollview --save
```

## 属性

| **属性**                       | **类型**   | **默认值** | **必填** | **描述**                                                          | **支持**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| ------------------------------ | ---------- | ---------- | -------- | ----------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| scrollEventThrottle            | `number`   | 50        | false    | 这个属性控制在滚动过程中，scroll 事件被调用的频率，用于滚动的节流 | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /> <img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" />                                                                                                                                                                                                                                                           |
| horizontal                     | `boolean`  | -          | false    | 设置为横向滚动                                                    | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /> <img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" /><img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" /> <img alt="wechatMiniprogram" src="https://img.alicdn.com/tfs/TB1slcYdxv1gK0jSZFFXXb0sXXa-200-200.svg" width="25px" height="25px"><img alt="bytedanceMicroApp" src="https://gw.alicdn.com/tfs/TB1jFtVzO_1gK0jSZFqXXcpaXXa-200-200.svg" width="25px" height="25px" /> <img alt="quickApp" src="https://gw.alicdn.com/tfs/TB1MP7EwQT2gK0jSZPcXXcKkpXa-200-200.svg" width="25px" height="25px">|
| scrollTop                      | `number`   | 0          | false    | 竖向滚动距离，优先级高于`scrollTo`方法（注：运行时小程序无法生效，请使用 `scrollTo` 方案）                            | <img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" /> <img alt="wechatMiniprogram" src="https://img.alicdn.com/tfs/TB1slcYdxv1gK0jSZFFXXb0sXXa-200-200.svg" width="25px" height="25px"><img alt="bytedanceMicroApp" src="https://gw.alicdn.com/tfs/TB1jFtVzO_1gK0jSZFqXXcpaXXa-200-200.svg" width="25px" height="25px" />                                                                                                                                                                                                                                               |
| scrollLeft                     | `number`   | 0          | false    | 横向滚动距离，优先级高于`scrollTo`方法（注：运行时小程序无法生效，请使用 `scrollTo` 方案）                             | <img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" /> <img alt="wechatMiniprogram" src="https://img.alicdn.com/tfs/TB1slcYdxv1gK0jSZFFXXb0sXXa-200-200.svg" width="25px" height="25px"><img alt="bytedanceMicroApp" src="https://gw.alicdn.com/tfs/TB1jFtVzO_1gK0jSZFqXXcpaXXa-200-200.svg" width="25px" height="25px" />                                                                                                                                                                                                                                               |
| showsHorizontalScrollIndicator | `boolean`  | true       | false    | 是否允许出现水平滚动条                                            | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /> <img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" />                                                                                                                                                                                                                                                           |
| showsVerticalScrollIndicator   | `boolean`  | true       | false    | 是否允许出现垂直滚动条                                            | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /> <img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" />                                                                                                                                                                                                                                                           |
| onEndReachedThreshold          | `number`   | 500         | false    | 设置加载更多的偏移                                                | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /> <img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" /><img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" /> <img alt="wechatMiniprogram" src="https://img.alicdn.com/tfs/TB1slcYdxv1gK0jSZFFXXb0sXXa-200-200.svg" width="25px" height="25px"><img alt="bytedanceMicroApp" src="https://gw.alicdn.com/tfs/TB1jFtVzO_1gK0jSZFqXXcpaXXa-200-200.svg" width="25px" height="25px" /> |
| onEndReached                   | `function` | -          | false    | 滚动区域还剩`onEndReachedThreshold`的长度时触发                   | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /> <img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" /><img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" /> <img alt="wechatMiniprogram" src="https://img.alicdn.com/tfs/TB1slcYdxv1gK0jSZFFXXb0sXXa-200-200.svg" width="25px" height="25px"><img alt="bytedanceMicroApp" src="https://gw.alicdn.com/tfs/TB1jFtVzO_1gK0jSZFqXXcpaXXa-200-200.svg" width="25px" height="25px" /><img alt="quickApp" src="https://gw.alicdn.com/tfs/TB1MP7EwQT2gK0jSZPcXXcKkpXa-200-200.svg" width="25px" height="25px"> |
| onScroll                       | `function` | -          | false    | 滚动时触发的事件，返回当前滚动的水平垂直距离                      | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /> <img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" /><img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" /> <img alt="wechatMiniprogram" src="https://img.alicdn.com/tfs/TB1slcYdxv1gK0jSZFFXXb0sXXa-200-200.svg" width="25px" height="25px"><img alt="bytedanceMicroApp" src="https://gw.alicdn.com/tfs/TB1jFtVzO_1gK0jSZFqXXcpaXXa-200-200.svg" width="25px" height="25px" /> <img alt="quickApp" src="https://gw.alicdn.com/tfs/TB1MP7EwQT2gK0jSZPcXXcKkpXa-200-200.svg" width="25px" height="25px">|
| onTouchStart                   | `function` | -          | false    | touchStart 触发的事件，返回触摸点数据（touches、changedTouches）  | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /> <img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" /><img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" />                                                                                                                                   |
| onTouchMove                    | `function` | -          | false    | touchMove 触发的事件，返回触摸点数据（touches、changedTouches）   | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /> <img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" /><img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" />                                                                                                                                   |
| onTouchEnd                     | `function` | -          | false    | touchEnd 触发的事件，返回触摸点数据（touches、changedTouches）    | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /> <img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" /><img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" />                                                                                                                                   |
| onTouchCancel                  | `function` | -          | false    | touchCancel 触发的事件，返回触摸点数据（touches、changedTouches） | <img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" />                                                                                                                                                                                                                                                                                                                                                                                 |
| disableScroll                  | `boolean`  | -          | false    | 是否禁止滚动, rax-scrollview@3.3.3 及以上版本支持                | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /> <img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" />      |

## 方法

### scrollTo({x: number,y: number, animated?: boolean, duration?: number})

#### 参数

**参数为 object，包含以下属性**

| **属性** | **类型**  | **默认值** | **必填** | **描述**                                                                          | **支持**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| -------- | --------- | ---------- | -------- | --------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| x        | `number`  | -          | 否       |  横向的偏移量                                                                     | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /> <img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" /><img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" /> <img alt="wechatMiniprogram" src="https://img.alicdn.com/tfs/TB1slcYdxv1gK0jSZFFXXb0sXXa-200-200.svg" width="25px" height="25px"><img alt="bytedanceMicroApp" src="https://gw.alicdn.com/tfs/TB1jFtVzO_1gK0jSZFqXXcpaXXa-200-200.svg" width="25px" height="25px" /> |
| y        | `number`  | -          | 否       | 纵向的偏移量                                                                      | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /> <img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" /><img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" /> <img alt="wechatMiniprogram" src="https://img.alicdn.com/tfs/TB1slcYdxv1gK0jSZFFXXb0sXXa-200-200.svg" width="25px" height="25px"><img alt="bytedanceMicroApp" src="https://gw.alicdn.com/tfs/TB1jFtVzO_1gK0jSZFqXXcpaXXa-200-200.svg" width="25px" height="25px" /> |
| animated | `boolean` | `true`     | 否       | 在设置滚动条位置时使用动画过渡                                                    | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /> <img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" /><img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" /> <img alt="wechatMiniprogram" src="https://img.alicdn.com/tfs/TB1slcYdxv1gK0jSZFFXXb0sXXa-200-200.svg" width="25px" height="25px"><img alt="bytedanceMicroApp" src="https://gw.alicdn.com/tfs/TB1jFtVzO_1gK0jSZFqXXcpaXXa-200-200.svg" width="25px" height="25px" /> |
| duration | `number`  | 400        | 否       | 当 `animated` 设置为 `true` 时，可以设置 duration 来控制动画的执行时间，单位 `ms` | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /> <img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" /> <img alt="wechatMiniprogram" src="https://img.alicdn.com/tfs/TB1slcYdxv1gK0jSZFFXXb0sXXa-200-200.svg" width="25px" height="25px"><img alt="bytedanceMicroApp" src="https://gw.alicdn.com/tfs/TB1jFtVzO_1gK0jSZFqXXcpaXXa-200-200.svg" width="25px" height="25px" />                                                                                                                      |

### scrollIntoView({id: string, animated?: boolean, duration?: number, offsetX?: number, offsetY?: number})

#### 参数

**参数为 `object`，包含以下属性**

| **属性** | **类型**  | **默认值** | **必填** | **描述**                                                                          | **支持**                                                                                                                                                                                                                                                                                                                                                                        |
| -------- | --------- | ---------- | -------- | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id       | `string`  | -          | 是       | 需要滚动到的元素 `id`                                                             | <img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" /><img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" /> <img alt="wechatMiniprogram" src="https://img.alicdn.com/tfs/TB1slcYdxv1gK0jSZFFXXb0sXXa-200-200.svg" width="25px" height="25px"><img alt="bytedanceMicroApp" src="https://gw.alicdn.com/tfs/TB1jFtVzO_1gK0jSZFqXXcpaXXa-200-200.svg" width="25px" height="25px" /> |
| animated | `boolean` | `true`     | 否       | 在设置滚动条位置时使用动画过渡                                                    | <img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" /><img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" /> <img alt="wechatMiniprogram" src="https://img.alicdn.com/tfs/TB1slcYdxv1gK0jSZFFXXb0sXXa-200-200.svg" width="25px" height="25px"><img alt="bytedanceMicroApp" src="https://gw.alicdn.com/tfs/TB1jFtVzO_1gK0jSZFqXXcpaXXa-200-200.svg" width="25px" height="25px" /> |
| duration | `number`  | 400        | 否       | 当 `animated` 设置为 `true` 时，可以设置 duration 来控制动画的执行时间，单位 `ms` | <img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" /> <img alt="wechatMiniprogram" src="https://img.alicdn.com/tfs/TB1slcYdxv1gK0jSZFFXXb0sXXa-200-200.svg" width="25px" height="25px"> <img alt="bytedanceMicroApp" src="https://gw.alicdn.com/tfs/TB1jFtVzO_1gK0jSZFqXXcpaXXa-200-200.svg" width="25px" height="25px" />                                                                                                                     |
| offsetX  | `number`  | -          | 否       | 滚动的额外 X 偏移 | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /> <img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" /> |
| offsetY  | `number`  | -          | 否       | 滚动的额外 Y 偏移 | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /> <img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" /> |

## 示例

```jsx
import { createElement, Component, render, createRef } from 'rax';

import DriverUniversal from 'driver-universal';
import View from 'rax-view';
import Text from 'rax-text';
import ScrollView from 'rax-scrollview';

function Thumb() {
  return (
    <View style={styles.button}>
      <View style={styles.box} />
    </View>
  );
}

const THUMBS = new Array(20).fill(1);
const createThumbRow = (val, index) => <Thumb key={index} />;

class App extends Component {
  state = {
    horizontalScrollViewEventLog: false,
    scrollViewEventLog: false,
  };
  constructor(props) {
    super(props);
    this.horizontalScrollView = createRef();
  }

  render() {
    return (
      <View style={styles.root}>
        <View style={styles.container}>
          <ScrollView
            ref={this.horizontalScrollView}
            style={{
              height: '100rpx',
            }}
            horizontal={true}
            onEndReached={() =>
              this.setState({ horizontalScrollViewEventLog: true })
            }
          >
            {THUMBS.map(createThumbRow)}
          </ScrollView>

          <View
            style={styles.button}
            onClick={() => {
              this.horizontalScrollView.current.scrollTo({ x: 0 });
            }}
          >
            <Text>Scroll to start</Text>
          </View>

          <View style={styles.eventLogBox}>
            <Text>
              {this.state.horizontalScrollViewEventLog ? 'onEndReached' : ''}
            </Text>
          </View>
        </View>

        <View style={{ ...styles.container, height: '500rpx' }}>
          <ScrollView
            ref={scrollView => {
              this.scrollView = scrollView;
            }}
            onEndReached={() => this.setState({ scrollViewEventLog: true })}
          >
            <View>
              <View style={styles.sticky}>
                <Text>Cannot sticky</Text>
              </View>
            </View>

            <View style={styles.sticky}>
              <Text>Sticky view must in ScrollView root</Text>
            </View>

            {THUMBS.map(createThumbRow)}
          </ScrollView>

          <View
            style={styles.button}
            onClick={() => {
              this.scrollView.scrollTo({ y: 0 });
            }}
          >
            <Text>Scroll to top</Text>
          </View>

          <View style={styles.eventLogBox}>
            <Text>{this.state.scrollViewEventLog ? 'onEndReached' : ''}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = {
  root: {
    width: '750rpx',
    paddingTop: '20rpx',
  },
  sticky: {
    position: 'sticky',
    width: '750',
    backgroundColor: '#cccccc',
  },
  container: {
    padding: '20rpx',
    borderStyle: 'solid',
    borderColor: '#dddddd',
    borderWidth: '1rpx',
    marginLeft: '20rpx',
    marginRight: '20rpx',
    marginBottom: '10rpx',
  },
  button: {
    margin: '7rpx',
    padding: '5rpx',
    alignItems: 'center',
    backgroundColor: '#eaeaea',
    borderRadius: '3rpx',
  },
  box: {
    width: '64rpx',
    height: '64rpx',
  },
  eventLogBox: {
    padding: '10rpx',
    margin: '10rpx;,
    height: '80rpx',
    borderWidth: '1rpx',
    borderColor: '#f0f0f0',
    backgroundColor: '#f9f9f9',
  },
};

render(<App />, document.body, { driver: DriverUniversal });
```
