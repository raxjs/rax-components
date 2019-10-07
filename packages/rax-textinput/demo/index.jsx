/* eslint-disable import/no-extraneous-dependencies */
import { createElement, Component, render, createRef } from 'rax';
import DU from 'driver-universal';
import View from 'rax-view';
import Text from 'rax-text';
import TextInput from '../src/index';
import styles from './style';

class TextAreaDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'Hello #World , Hello #Rax , Hello #天天好心情'
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
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {hashtags}
        </View>
      </View>
    );
  }
}

class App extends Component {
  state = {
    value: 'I am value',
    curText: '<No Event>',
    prevText: '<No Event>',
    prev2Text: '<No Event>',
    prev3Text: '<No Event>'
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
              this.updateText('onChange text: ' + event.nativeEvent.text);
            }}
            // onInput={event =>
            //   this.updateText('onInput text: ' + event.nativeEvent.text)
            // }
            style={styles.default}
          />

          <Text style={styles.eventLabel}>
            {this.state.curText}
            {'\n'}
            (prev: {this.state.prevText}){'\n'}
            (prev2: {this.state.prev2Text}){'\n'}
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
              borderWidth: '2px',
              borderColor: '#dddddd',
              borderStyle: 'solid'
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
                value: 'I am value'
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
