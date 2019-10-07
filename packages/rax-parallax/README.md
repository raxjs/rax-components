[![npm](https://img.shields.io/npm/v/rax-parallax.svg)](https://www.npmjs.com/package/rax-parallax)

**描述：**
用于呈现滚动视差效果: 随着用户滚动页面，一些组件会随着滚动产生动画视差效果，如放大/缩小、位移、背景色/透明度/模糊渐变等
![](http://ata2-img.cn-hangzhou.img-pub.aliyun-inc.com/5cba5521d6192d3415b016e946d6d21c.gif)
> 注意: 在weex环境下必须放在滚动容器的第一个位置
> 注意: 该组件目前只支持H5和weex，不支持小程序
## 安装

```bash
$ npm install --save rax-parallax
```
## 引用

```jsx
import Parallax from 'rax-parallax';
```

## 属性
注：
1、**支持**列表中的 <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" />代表h5 <img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" />代表weex  <img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" />代表小程序

|**属性**| **类型** | **默认值** | **必填** | **描述**           | **支持** |
| ----------- | ---------- | ---------- | ------------ | ------------------ | ------------ |
| bindingScroller        | `ref`   | -|true  |  滚动容器，比如scrollview,recyclerview |<img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /><img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" />|
| transform        | `array`   | -|false | transform变换属性 |<img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /><img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" />|
| opacity   | `object`   | - | false|透明度变换属性 |<img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /><img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" />|
| backgroundColor  | `object`|-|false   | 背景色变换属性 |<img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /><img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" />|
| extraBindingProps      | `array` |[]| false | 额外需要绑定在bindingScroller上的binding属性 |<img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /><img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" />|

## 示例
```jsx
import { createElement, Component, render, createRef } from 'rax';
import View from 'rax-view';
import Text from 'rax-text';
import RecyclerView from 'rax-recyclerview';
import Picture from 'rax-picture';
import DU from "driver-universal"
import Parallax from 'rax-parallax';

let listData = [
  { name1: 'tom' }, { name1: 'tom' }, { name1: 'tom' },
  { name1: 'tom' }, { name1: 'tom' }, { name1: 'tom' },
  { name1: 'tom' }, { name1: 'tom' }, { name1: 'tom' },
  { name1: 'tom' }, { name1: 'tom' }, { name1: 'tom' },
  { name1: 'tom' }, { name1: 'tom' }, { name1: 'tom' },
  { name1: 'tom' }, { name1: 'tom' }, { name1: 'tom' },
  { name1: 'tom' }, { name1: 'tom' }, { name1: 'tom' },
  { name1: 'tom' }, { name1: 'tom' }, { name1: 'tom' },
  { name1: 'tom' }, { name1: 'tom' }, { name1: 'tom' },
  { name1: 'tom' }, { name1: 'tom' }, { name1: 'tom' },
  { name1: 'tom' }, { name1: 'tom' }, { name1: 'tom' },
  { name1: 'tom' }, { name1: 'tom' }, { name1: 'tom' },
  { name1: 'tom' }, { name1: 'tom' }, { name1: 'tom' },
  { name1: 'tom' }, { name1: 'tom' }, { name1: 'tom' },
  { name1: 'tom' }, { name1: 'tom' }, { name1: 'tom' },
  { name1: 'tom' }, { name1: 'tom' }, { name1: 'tom' },
];


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      data: listData
    };
    this.bindingScroller = createRef()
  }

  listLoading = () => {
    if (this.state.index < 4) {
      return (
        <View style={styles.loading}>
          <Text style={styles.text}>加载中...</Text>
        </View>
      );
    } else {
      return null;
    }
  }
  listItem = (item, index) => {
    if (index % 2 == 0) {
      return (
        <RecyclerView.Cell>
          <View style={styles.item1}>
            <Text style={styles.text}>{item.name1}</Text>
          </View>
        </RecyclerView.Cell>

      );
    } else {
      return (
        <RecyclerView.Cell>
          <View style={styles.item2}>
            <Text style={styles.text}>{item.name1}</Text>
          </View>
        </RecyclerView.Cell>

      );
    }
  }
  handleLoadMore = () => {
    setTimeout(() => {
      this.state.index++;
      if (this.state.index < 5) {
        this.state.data.push(
          { name1: 'loadmore 2' },
          { name1: 'loadmore 3' },
          { name1: 'loadmore 4' },
          { name1: 'loadmore 5' },
          { name1: 'loadmore 2' },
          { name1: 'loadmore 3' },
          { name1: 'loadmore 4' },
          { name1: 'loadmore 5' }
        );
      }
      this.setState(this.state);
    }, 1000);
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        bindingScroller: this.bindingScroller
      });
    }, 100);
  }

  render() {
    let dataSource = this.state.data;
    return (
      <View style={styles.container}>
        <Parallax
          bindingScroller={this.state.bindingScroller}
          transform={[
            {
              type: 'translate',
              in: [0, 660],
              out: [0, 0, 0, -660] // [x1,y1,x2,y2]
            },
            {
              type: 'scale',
              in: [-150, 0],
              out: [1.3, 1.3, 1, 1]  // [x1,y1,x2,y2]
            }
          ]}>
          <Picture style={{ width: 750, height: 576 }}
            source={{ uri: '//gw.alicdn.com/tfs/TB12DNfXMmTBuNjy1XbXXaMrVXa-750-576.png' }} />
        </Parallax>
        <RecyclerView
          ref={this.bindingScroller}
          style={styles.list}
          onEndReached={this.handleLoadMore}
        >
          <RecyclerView.Cell>
            <View style={styles.title}>
              <Text style={styles.text}>列表头部</Text>
            </View>
          </RecyclerView.Cell>
          {dataSource.map(this.listItem)}
          {this.listLoading()}
        </RecyclerView>
      </View>
    );
  }

};

const styles = {
  container: {
    flex: 1
  },
  title: {
    margin: 50,
    height: 300
  },
  text: {
    fontSize: 28,
    color: '#fff',
    padding: 40
  },
  list: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  item1: {
    height: 110,
    backgroundColor: '#909090',
    marginBottom: 3
  },
  item2: {
    height: 110,
    backgroundColor: '#e0e0e0',
    marginBottom: 3
  },
  loading: {
    padding: 50,
    textAlign: 'center',
  }
};

render(<App />, document.body, { driver: DU });

```
