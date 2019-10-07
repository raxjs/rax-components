[![npm](https://img.shields.io/npm/v/rax-textinput.svg)](https://www.npmjs.com/package/rax-textinput)

**描述：**
TextInput 是唤起用户输入的基础组件。

当定义 multiline 输入多行文字时其功能相当于 textarea。

## 安装

```bash
$ npm install rax-textinput --save
```

## 属性

注：
1、**支持**列表中的 <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" />代表 h5 <img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" />代表 weex <img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" />代表小程序

| **属性**           | **类型**   | **默认值** | **必填** | **描述**                                                                                                                                                                                        | **支持**                                                                                                                                                                                                                                                                                                                                                                |
| ------------------ | ---------- | ---------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| multiline          | `boolen`   | -          | false    | 定义该属性文本框可以输入多行文字                                                                                                                                                                | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /> <img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" /> <img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" /> |
| accessibilityLabel | `string`   | -          | false    | 为元素添加标识                                                                                                                                                                                  | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" />                                                                                                                                                                                                                                                |
| autoComplete       | `boolen`   | -          | false    | 添加开启自动完成功能                                                                                                                                                                            | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /> <img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" />                                                                                                                          |
| autoFocus          | `boolen`   | -          | false    | 添加开启获取焦点                                                                                                                                                                                | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /> <img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" /> <img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" /> |
| onAppear           | `function` | -          | false    | 当前元素可见时触发                                                                                                                                                                              | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /> <img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" /> <img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" /> |
| editable           | `boolean`  | -          | false    | 默认为 true 如果为 fase 则文本框不可编辑                                                                                                                                                        | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /> <img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" /><img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" />  |
| keyboardType       | `string`   | -          | false    | 设置弹出哪种软键盘 可用的值有`default` `ascii-capable` `numbers-and-punctuation` `url` `number-pad` `phone-pad` `name-phone-pad` `email-address` `decimal-pad` `twitter` `web-search` `numeric` | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /> <img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" />                                                                                                                          |
| maxLength          | `number`   | -          | false    | 设置最大可输入值                                                                                                                                                                                | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /> <img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" /><img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" />  |
| maxNumberOfLines   | `number`   | -          | false    | 当文本框为 mutiline 时设置最多的行数                                                                                                                                                            | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /> <img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" />                                                                                                                          |
| numberOfLines      | `number`   | -          | false    | 同上设置行数                                                                                                                                                                                    | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /> <img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" />                                                                                                                          |
| placeholder        | `string`   | -          | false    | 设置文本框提示                                                                                                                                                                                  | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /> <img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" /><img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" />  |
| password           | `boolean`  | -          | false    | 文本框内容密码显示                                                                                                                                                                              | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /> <img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" /><img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" />  |
| secureTextEntry    | `boolean`  | -          | false    | 同上文本框内容密码显示                                                                                                                                                                          | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /> <img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" /><img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" />  |
| value              | `string`   | -          | false    | 文本框的文字内容 (受控)                                                                                                                                                                         | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /> <img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" /><img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" />  |
| defaultValue       | `string`   | -          | false    | 文本框的文字内容（非受控）                                                                                                                                                                      | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /> <img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" /><img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" />  |
| onBlur             | `function` | -          | false    | 文本框失焦时调用此函数。`onBlur={() => console.log('失焦啦')}`                                                                                                                                  | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /> <img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" /><img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" />  |
| onFocus            | `function` | -          | false    | 文本框获得焦点时调用此函数                                                                                                                                                                      | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /> <img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" /><img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" />  |
| onChange           | `function` | -          | false    | 文本框内容变化时调用此函数（用户输入完成时触发。通常在 blur 事件之后）                                                                                                                          | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /> <img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" /><img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" />  |
| onChangeText       | `function` | -          | false    | 触发时机和`onChange`一致, 区别在于该函数的参数是文本框内容                                                                                                                                      | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /> <img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" /><img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" />  |
| onInput            | `function` | -          | false    | 文本框输入内容时调用此函数                                                                                                                                                                      | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /> <img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" /><img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" />  |

## 方法

### focus()

取焦点方法(小程序不支持)

### blur()

失去焦点方法(小程序不支持)

### clear()

清除文本框内容(小程序不支持)

```jsx
import { createElement, Component, render, createRef } from "rax";
import DU from "driver-universal";
import View from "rax-view";
import Text from "rax-text";
import TextInput from "rax-textinput";
const styles = {
  root: {
    width: 750,
    paddingTop: 20
  },
  container: {
    padding: 20,
    borderStyle: "solid",
    borderColor: "#dddddd",
    borderWidth: 1,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10
  },
  default: {
    borderWidth: 1,
    borderColor: "#0f0f0f",
    flex: 1
  },
  eventLabel: {
    margin: 3,
    fontSize: 24
  },
  multiline: {
    borderWidth: 1,
    borderColor: "#0f0f0f",
    flex: 1,
    fontSize: 26,
    height: 100,
    padding: 8,
    marginBottom: 8
  },
  hashtag: {
    color: "blue",
    margin: 10,
    fontWeight: "bold"
  }
};
class TextAreaDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "Hello #World , Hello #Rax , Hello #天天好心情"
    };
  }

  render() {
    let delimiter = /\s+/;

    // split string
    let _text = this.state.text;
    let token,
      index,
      parts = [];
    while (_text) {
      delimiter.lastIndex = 0;
      token = delimiter.exec(_text);
      if (token === null) {
        break;
      }
      index = token.index;
      if (token[0].length === 0) {
        index = 1;
      }
      parts.push(_text.substr(0, index));
      parts.push(token[0]);
      index = index + token[0].length;
      _text = _text.slice(index);
    }
    parts.push(_text);

    let hashtags = [];
    parts.forEach(text => {
      if (/^#/.test(text)) {
        hashtags.push(
          <Text key={text} style={styles.hashtag}>
            {text}
          </Text>
        );
      }
    });

    return (
      <View style={styles.container}>
        <TextInput
          multiline={true}
          numberOfLines={3}
          style={styles.multiline}
          value={this.state.text}
          onChangeText={text => {
            this.setState({ text });
          }}
        />
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {hashtags}
        </View>
      </View>
    );
  }
}

class App extends Component {
  state = {
    value: "I am value",
    curText: "<No Event>",
    prevText: "<No Event>",
    prev2Text: "<No Event>",
    prev3Text: "<No Event>"
  };

  inputRef = createRef();

  updateText = text => {
    this.setState(state => {
      return {
        curText: text,
        prevText: state.curText,
        prev2Text: state.prevText,
        prev3Text: state.prev2Text
      };
    });
  };

  render() {
    // define delimiter
    return (
      <View style={styles.root}>
        <View style={styles.container}>
          <TextInput
            autoCapitalize="none"
            placeholder="Enter text to see events"
            autoCorrect={false}
            // onFocus={() => this.updateText('onFocus')}
            // onBlur={() => this.updateText('onBlur')}
            onChange={event => {
              this.updateText("onChange text: " + event.nativeEvent.text);
            }}
            // onInput={event =>
            //   this.updateText('onInput text: ' + event.nativeEvent.text)
            // }
            style={styles.default}
          />

          <Text style={styles.eventLabel}>
            {this.state.curText}
            {"\n"}
            (prev: {this.state.prevText}){"\n"}
            (prev2: {this.state.prev2Text}){"\n"}
            (prev3: {this.state.prev3Text})
          </Text>
        </View>

        <View style={styles.container}>
          <TextInput
            placeholder="Enter text to see events"
            value={this.state.value}
            ref={this.inputRef}
            style={{
              width: 600,
              marginTop: 20,
              borderWidth: "2px",
              borderColor: "#dddddd",
              borderStyle: "solid"
            }}
            onChangeText={text => {
              this.setState({
                value: text
              });
            }}
          />

          <View
            style={{
              marginTop: 20
            }}
            onFocus={e => {
              this.setState({
                value: e.nativeEvent.text
              });
            }}
            onClick={() => {
              this.setState({
                value: "I am value"
              });
            }}
          >
            <Text>Reset</Text>
          </View>
        </View>
        <TextAreaDemo />
      </View>
    );
  }
}

render(<App />, document.body, { driver: DU });
```
