[![npm](https://img.shields.io/npm/v/rax-text.svg)](https://www.npmjs.com/package/rax-text)

**描述：**
Text 用于显示文本，在 web 中实际上是一个 span 标签而非 p 标签。 
## 安装

```bash
$ npm install rax-text --save
```
## 引用

```jsx
import Text from 'rax-text';
```

## 属性
注：
1、**支持**列表中的 <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" />代表h5 <img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" />代表weex  <img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" />代表小程序  <img alt="quickApp" src="https://gw.alicdn.com/tfs/TB1MP7EwQT2gK0jSZPcXXcKkpXa-200-200.svg" width="25px" height="25px">代表快应用<img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1jFtVzO_1gK0jSZFqXXcpaXXa-200-200.svg" width="25px" height="25px" />代表字节跳动小程序

| **属性**    | **类型**   | **默认值** | **必填** | **描述**           | **支持** |
| ----------- | ---------- | ---------- | ------------ | ------------------ | ------------ |
| numberOfLines     | `number` | 1         |   false           | 行数 | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /><img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" /><img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" /><img alt="quickApp" src="https://gw.alicdn.com/tfs/TB1MP7EwQT2gK0jSZPcXXcKkpXa-200-200.svg" width="25px" height="25px"> <img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1jFtVzO_1gK0jSZFqXXcpaXXa-200-200.svg" width="25px" height="25px" /> |
| selectable     | `boolean` | false         |   false           | 是否可选 | <img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" />   |
| space     | `string` |         |         false     | 以何种方式显示连续空格 | <img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" />  |
| decode     | `boolean` |         |   false           | 是否解码。为 true 时表示对文本内容进行解码，可解析的 HTML 实体字符有：&nbsp; &lt; &gt; &amp; &apos; &ensp; &emsp; | <img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" />  |
## 示例
```js
import {createElement, render, Component} from 'rax';
import DU from 'driver-universal';
import View from 'rax-view';
import Text from 'rax-text';

const styles = {
  root: {
    width: 750,
    paddingTop: 20,
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
  textBlock: {
    fontWeight: '500',
    color: 'blue',
  },
  logBox: {
    padding: 20,
    margin: 10,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    backgroundColor: '#f9f9f9',
  },
};

class App extends Component {
  render() {
    return (
      <View style={styles.root}>
        <View style={{
          ...styles.container, ...{
            flexDirection: 'row',
            justifyContent: 'flex-start',
          }
        }}>
          <Text>text</Text>
          <Text style={{
            color: '#ff4200'
          }}>Mixing</Text>
        </View>

        <View style={styles.container}>
          <Text numberOfLines={1} style={{
            width: 300,
            textOverflow: 'ellipsis',
          }}>Single line of text exceeds truncated text</Text>

          <Text numberOfLines={2} style={{
            width: 300,
            textOverflow: 'ellipsis',
          }}>
          Multi-line text exceeds truncated text, exceeds truncated text, exceeds truncated text, exceeds truncated text</Text>
        </View>

        <View style={styles.container}>
          <Text style={{textDecoration: 'underline'}}>
          Text underline
          </Text>
          <Text style={{textDecorationLine: 'none'}}>
           no Underlined
          </Text>
          <Text style={{textDecoration: 'line-through'}}>
          Text strikethrough
          </Text>
        </View>

        <View style={styles.container}>
          <Text style={{lineHeight: '120rpx'}}>
          Line height 120rpx, multi-line text text folding effect Multi-line text text folding effect
          </Text>
        </View>

      </View>
    );
  }
}

render(<App/>, document.body, {driver: DU});

```


