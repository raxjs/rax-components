[![npm](https://img.shields.io/npm/v/rax-waterfall.svg)](https://www.npmjs.com/package/rax-waterfall)

**描述：**
用于实现瀑布流的列表容器
## 安装
```bash
$ npm install rax-waterfall --save
```
## 引用

```jsx
import WaterFall from 'rax-waterfall';
```

## 属性
注：
1、**支持**列表中的 <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" />代表h5 <img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" />代表weex  <img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" />代表小程序;
2、weex 版本 v0.11.0+ 开始支持

|**属性**| **类型** | **默认值** | **必填** | **描述**           | **支持** |
| ----------- | ---------- | ---------- | ------------ | ------------------ | ------------ |
| dataSource     | `array` | -      |     true         | 瀑布流数组，需要传入模块高度 | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /> <img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" />|
| renderItem     | `function` | -          |      true        | 渲染每项的模板 | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /> <img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" /><img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" />|
| renderHeader     | `function` | -          |     false         | 渲染 header 部分 | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /> <img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" />|
| renderFooter     | `function` | -          |     false        | 渲染 footer 部分 | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /> <img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" />|
| columnWidth     | `number` | 750         |     false         | 列宽 | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /> <img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" /><img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" />|
| columnCount     | `number` | 1         |     false         | 列数 | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /> <img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" /><img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" />|
| columnGap     | `number` | 0          |     false         | 列间距 | <img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" />|
| cellProps     | `object` | -          |     false         | weex Cell 组件的props | <img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" />|
| onEndReachedThreshold     | `number` | 500         |     false         | 设置加载更多的偏移 | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /> <img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" /><img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" />|
| onEndReached     | `function` | -          |     false         | 滚动区域还剩`onEndReachedThreshold`的长度时触发 | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /> <img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" /><img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" />|
| leftGap     | `number` | o          |     false         | 距离左边的间隙 | <img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" /><img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" />|
| rightGap     | `number` | o          |     false         | 距离右边的间隙 | <img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" /><img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" />|

## 示例
```jsx
import {createElement, Component, render} from 'rax';
import View from 'rax-view';
import Text from 'rax-text';
import DU from "driver-universal"
import RefreshControl from 'rax-refreshcontrol';
import Waterfall from 'rax-waterfall';

let dataSource = [
  { height: 550, item: {} },
  { height: 624, item: {} },
  { height: 708, item: {} },
  { height: 600, item: {} },
  { height: 300, item: {} },
  { height: 100, item: {} },
  { height: 400, item: {} },
  { height: 550, item: {} },
  { height: 624, item: {} },
  { height: 708, item: {} },
  { height: 600, item: {} },
  { height: 300, item: {} },
  { height: 100, item: {} },
  { height: 400, item: {} }
];

class App extends Component {

  state = {
    refreshing: false,
    dataSource: dataSource
  }

  handleRefresh = () => {
    if (this.state.refreshing) {
      return;
    }

    this.setState({
      refreshing: true,
      dataSource: []
    });

    setTimeout(() => {
      this.setState({
        refreshing: false,
        dataSource: dataSource
      });
    }, 500);

  }

  loadMore = () => {
    setTimeout(() => {
      this.setState({
        dataSource: this.state.dataSource.concat(dataSource)
      });
    }, 1000);
  }


  render() {
    return (<View style={{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0}}>
      <View>first module</View>
      <Waterfall
        columnWidth={150}
        columnCount={4}
        columnGap={50}
        dataSource={this.state.dataSource}
        renderHeader={() => {
          return [
            <RefreshControl
              key="0"
              refreshing={this.state.refreshing}
              onRefresh={this.handleRefresh}>
              <Text>下拉刷新</Text>
            </RefreshControl>,
            <View key="1" style={{width: 750, height: 100, backgroundColor: 'yellow', marginBottom: 20}}>header1</View>,
            <View key="2" style={{width: 750, height: 100, backgroundColor: 'green', marginBottom: 20}}>header2</View>
          ];
        }}
        renderFooter={() => {
          return <View key="3" style={{width: 750, height: 300, backgroundColor: 'blue', marginTop: 20}}>footer1</View>;
        }}
        renderItem={(item, index) => {
          return (<View style={{height: item.height, backgroundColor: 'red', marginBottom: 20}}>
          <Text>{index}</Text>
            {/* {index} */}
          </View>);
        }}
        onEndReached={this.loadMore} />
    </View>);
  }
}

render(<App />, document.body, { driver: DU });
```



