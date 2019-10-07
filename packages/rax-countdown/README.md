[![npm](https://img.shields.io/npm/v/rax-countdown.svg)](https://www.npmjs.com/package/rax-countdown)

## 支持

Web / Weex / 小程序

## 描述

倒计时组件，可设置倒计时毫秒数，以及展现的模板。

## 安装

```bash
$ npm install rax-countdown --save
```

## 属性

1、**支持**列表中的 <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" />代表h5 <img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" />代表weex  <img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" />代表小程序


| **属性**    | **类型**   | **默认值** | **必填** | **描述**           | **支持** |
| ----------- | ---------- | ---------- | ------------ | ------------------ | ------------ |
| timeRemaining     | `number` | -          |      是        | 倒计时剩余时间,单位为"毫秒" | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /><img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" /><img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" />  |
| interval | `number` |   1000       |     否         | 倒计时的间隔,单位为"毫秒"         | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /><img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" /><img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" />    |
| tpl     | `String` | {d}天{h}时{m}分{s}秒{ms}       |  否       |    倒计时展示模板       | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /><img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" /><img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" />           |   
| formatFunc     | `function` | -      |  否       |    自定义格式化剩余时间的方法,非undefined时tpl失效,处理剩余时间的展示      | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /><img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" /><img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" />           |   
| onTick     | `function` | -      |  否       |    倒计时变化时调用的方法      | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /><img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" /><img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" />           |   
| onComplete     | `function` | -      |  否       |   倒计时完成时调用的方法      | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /><img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" /><img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" />           |   
| timeStyle     | `object` | -      |  否       |   数字第一位的样式      | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /><img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" /><img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" />           |   
| secondStyle     | `object` | -      |  否       |   数字第二位的样式      | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /><img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" /><img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" />           |  
| textStyle     | `object` | -      |  否       |   时间-单位的样式      | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /><img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" /><img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" />           |  
| timeWrapStyle     | `object` | -      |  否       |   各时间区块的样式      | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /><img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" /><img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" />           |  
| timeBackground     | `object` | -      |  否       |   各时间区块背景(可加背景图)      | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /><img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" /><img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" />           |  
| timeBackgroundStyle     | `object` | -      |  否       |   各时间区块背景样式     | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /><img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" /><img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" />           |  
## 示例

[在线 Demo](https://jsplayground.taobao.org/raxplayground/a7244d6b-0291-4018-a9da-5a9cbef94c88)

```js
import { createElement, render, Component } from 'rax';
import View from 'rax-view';
import Countdown from 'rax-countdown';
import DU from 'driver-universal';

class App extends Component {
  onComplete() {
    console.log('countdown complete');
  }
  render() {
    return (
      <View style={styles.root}>
        <View style={styles.container}>
          <Countdown
            timeRemaining={100000}
            tpl={'{d}天{h}时{m}分{s}秒'}
            onComplete={this.onComplete}
          />
        </View>
        <View style={styles.container}>
          <Countdown
            timeRemaining={100000000}
            timeStyle={{
              'color': '#007457',
              'backgroundColor': 'red',
              'marginLeft': '2rpx',
              'marginRight': '2rpx'
            }}
            secondStyle={{'backgroundColor': 'yellow'}}
            textStyle={{'backgroundColor': 'blue'}}
            tpl={'{d}-{h}-{m}-{s}'}
            onComplete={this.onComplete}
          />
        </View>
        <View style={styles.container}>
          <Countdown
            timeRemaining={500000}
            tpl="{h}:{m}:{s}"
            timeStyle={{
              color: '#ffffff',
              fontSize: 40,
              position: 'relative'
            }}
            secondStyle={{
              color: '#ffffff',
              fontSize: 40,
              position: 'relative'
            }}
            timeWrapStyle={{
              borderRadius: 6,
              width: 50,
              height: 60,
              backgroundColor: '#333333',
            }}
          />
        </View>
        <View style={styles.container}>
          <Countdown
            timeRemaining={500000}
            tpl="{h}:{m}:{s}"
            timeStyle={{
              color: '#ffffff',
              fontSize: 40,
              position: 'relative'
            }}
            secondStyle={{
              color: '#ffffff',
              fontSize: 40,
              position: 'relative'
            }}
            timeBackground={{
              uri: 'https://gw.alicdn.com/tfs/TB1g6AvPVXXXXa7XpXXXXXXXXXX-215-215.png'
            }}
            timeBackgroundStyle={{
              width: 50,
              height: 80
            }}
          />
        </View>
      </View>
    );
  }
}

let styles = {
  root: {
    width: 750,
    paddingTop: 20
  },
  container: {
    padding: 20,
    borderStyle: 'solid',
    borderColor: '#dddddd',
    borderWidth: 1,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
  },
};

render(<App />, document.body, { driver: DU });
```