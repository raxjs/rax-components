[![npm](https://img.shields.io/npm/v/rax-recyclerview.svg)](https://www.npmjs.com/package/rax-recyclerview)

### 描述

`ScrollView` 的同门师兄，在 Weex 下是对 `list` 与 `cell` 的包装，其具有复用内部组件来提供性能的机制。

![](https://gw.alicdn.com/tfs/TB1Cf_ZRVXXXXa8XVXXXXXXXXXX-255-265.gif)

### 安装

```bash
npm install rax-recyclerview --save
```



### 属性

| 属性                  | 类型              | 默认值 | 必填 | 描述                                            | 支持                                                         |
| --------------------- | ----------------- | ------ | ---- | ----------------------------------------------- | ------------------------------------------------------------ |
| onEndReachedThreshold | `Number`          | 500    | ✘    | 设置加载更多的偏移                              | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /> <img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" /> <img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" /><img alt="bytedanceMicroApp" src="https://gw.alicdn.com/tfs/TB1jFtVzO_1gK0jSZFqXXcpaXXa-200-200.svg" width="25px" height="25px"> |
| onEndReached          | `Function`        | -      | ✘    | 滚动区域还剩`onEndReachedThreshold`的长度时触发 | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" />  <img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" /> <img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" /> <img alt="wechatMiniprogram" src="https://img.alicdn.com/tfs/TB1slcYdxv1gK0jSZFFXXb0sXXa-200-200.svg" width="25px" height="25px"><img alt="bytedanceMicroApp" src="https://gw.alicdn.com/tfs/TB1jFtVzO_1gK0jSZFqXXcpaXXa-200-200.svg" width="25px" height="25px"> |
| onScroll              | `Function`        | -      | ✘    | 滚动时触发的事件，返回当前滚动的水平垂直距离    | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" />  <img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" /> <img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" /> <img alt="wechatMiniprogram" src="https://img.alicdn.com/tfs/TB1slcYdxv1gK0jSZFFXXb0sXXa-200-200.svg" width="25px" height="25px"><img alt="bytedanceMicroApp" src="https://gw.alicdn.com/tfs/TB1jFtVzO_1gK0jSZFqXXcpaXXa-200-200.svg" width="25px" height="25px"> |
| itemSize              | `Function/Number` | -      | ✘    | 返回每个 cell 的高度(节点回收时需要)            | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /> |
| totalSize             | `Number`          | -      | ✘    | 当前列表总高度(在 cell 高度可变的列表中需要传)  | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /> |
| onTouchStart                      | `function` | -          | false    | touchStart触发的事件，返回触摸点数据（touches、changedTouches）                      | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /> <img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" /><img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" />  |
| onTouchMove                      | `function` | -          | false    | touchMove触发的事件，返回触摸点数据（touches、changedTouches）                      | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /> <img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" /><img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" />  |
| onTouchEnd                     | `function` | -          | false    | touchEnd触发的事件，返回触摸点数据（touches、changedTouches）                      | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /> <img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" /><img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" />  |
| onTouchCancel                    | `function` | -          | false    | touchCancel触发的事件，返回触摸点数据（touches、changedTouches）                      | <img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" />  |

注：
1、**支持**列表中的 <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" />代表h5 <img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" />代表weex  <img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" />代表小程序

|**属性**| **类型** | **默认值** | **必填** | **描述**           | **支持** |
| ----------- | ---------- | ---------- | ------------ | ------------------ | ------------ |
| onEndReachedThreshold     | `number` | 500         |     false         | 设置加载更多的偏移，快应用只支持值为0 | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /> <img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" /><img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" /><img alt="bytedanceMicroApp" src="https://gw.alicdn.com/tfs/TB1jFtVzO_1gK0jSZFqXXcpaXXa-200-200.svg" width="25px" height="25px"><img alt="quickApp" src="https://gw.alicdn.com/tfs/TB1MP7EwQT2gK0jSZPcXXcKkpXa-200-200.svg" width="25px" height="25px"> |
| onEndReached     | `function` | -          |     false         | 滚动区域还剩`onEndReachedThreshold`的长度时触发， 快应用只支持值为0时的触发，即列表滚动到底部时触发的事件 | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /> <img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" /><img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" /> <img alt="bytedanceMicroApp" src="https://gw.alicdn.com/tfs/TB1jFtVzO_1gK0jSZFqXXcpaXXa-200-200.svg" width="25px" height="25px"><img alt="quickApp" src="https://gw.alicdn.com/tfs/TB1MP7EwQT2gK0jSZPcXXcKkpXa-200-200.svg" width="25px" height="25px">|
| onScroll     | `function` | -          |     false         | 滚动时触发的事件，返回当前滚动的水平垂直距离 | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /> <img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" /><img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" /><img alt="bytedanceMicroApp" src="https://gw.alicdn.com/tfs/TB1jFtVzO_1gK0jSZFqXXcpaXXa-200-200.svg" width="25px" height="25px"><img alt="quickApp" src="https://gw.alicdn.com/tfs/TB1MP7EwQT2gK0jSZPcXXcKkpXa-200-200.svg" width="25px" height="25px">|
| itemSize     | `function|number` | -          |     -         | 返回每个 cell 的高度(节点回收时需要) | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /> |
| totalSize     | `number` | -          |     -         | 当前列表总高度(在 cell 高度可变的列表中需要传) | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /><img alt="quickApp" src="https://gw.alicdn.com/tfs/TB1MP7EwQT2gK0jSZPcXXcKkpXa-200-200.svg" width="25px" height="25px"> |
## 方法
### scrollTo({x:number,y:number})

#### 参数

参数为 `Object`，包含以下属性

| **属性** | **类型** | **默认值** | **必填** | **描述**     |
| -------- | -------- | ---------- | -------- | ------------ |
| x        | `Number` | -          | ✘        | 横向的偏移量 |
| y        | `Number` | -          | ✘        | 纵向的偏移量 |

### 示例

```jsx
import { createElement, Component, render } from "rax";

import View from "rax-view";

import Text from "rax-text";

import DriverUniversal from "driver-universal";

import RecyclerView from "rax-recyclerview";

class Thumb extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

  render() {
    return (
      <RecyclerView.Cell>
        <View style={styles.button}>
          <View style={styles.box} />
        </View>
      </RecyclerView.Cell>
    );
  }
}

class Row extends Component {
  handleClick = e => {
    this.props.onClick(this.props.data);
  };

  render() {
    return (
      <View onClick={this.handleClick}>
        <View style={styles.row}>
          <Text style={styles.text}>
            {this.props.data.text + " (" + this.props.data.clicks + " clicks)"}
          </Text>
        </View>
      </View>
    );
  }
}

const THUMBS = [];

for (let i = 0; i < 20; i++) THUMBS.push(i);

const createThumbRow = (val, i) => <Thumb key={i} />;

class App extends Component {
  state = {
    horizontalScrollViewEventLog: false,
    scrollViewEventLog: false
  };

  render() {
    return (
      <View style={styles.root}>
        <View style={styles.container}>
          <RecyclerView
            ref={scrollView => {
              this.scrollView = scrollView;
            }}
            style={{
              height: 500
            }}
            onEndReached={() => alert("reach end")}
          >
            <RecyclerView.Header style={styles.sticky}>
              <Text>Sticky view is not header</Text>​{" "}
            </RecyclerView.Header>
            <RecyclerView.Header>
              <View style={styles.sticky}>
                <Text>Sticky view must in header root</Text>
              </View>
            </RecyclerView.Header>
            {THUMBS.map(createThumbRow)}
          </RecyclerView>
          <View
            style={styles.button}
            onClick={() => this.scrollView.scrollTo({ y: 0 })}
          >
            <Text>Scroll to top</Text>
          </View>
          <View style={styles.eventLogBox}>
            <Text>{this.state.scrollViewEventLog ? "onEndReached" : ""}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = {
  root: {
    width: 750,
    paddingTop: 20
  },

  sticky: {
    position: "sticky",
    width: 750,
    backgroundColor: "#cccccc"
  },

  container: {
    padding: 20,
    borderStyle: "solid",
    borderColor: "#dddddd",
    borderWidth: 1,
    marginLeft: 20,
    height: 1000,
    marginRight: 20,
    marginBottom: 10
  },

  button: {
    margin: 7,
    padding: 5,
    alignItems: "center",
    backgroundColor: "#eaeaea",
    borderRadius: 3
  },

  box: {
    width: 64,
    height: 64
  },

  eventLogBox: {
    padding: 10,
    margin: 10,
    height: 80,
    borderWidth: 1,
    borderColor: "#f0f0f0",
    backgroundColor: "#f9f9f9"
  },

  row: {
    borderColor: "grey",
    borderWidth: 1,
    padding: 20,
    margin: 5
  },

  text: {
    alignSelf: "center",
    color: "black"
  },

  refreshView: {
    height: 80,
    width: 750,
    justifyContent: "center",
    alignItems: "center"
  },

  refreshArrow: {
    fontSize: 30,
    color: "#45b5f0"
  }
};

render(<App />, document.body, { driver: DriverUniversal });

```


