/* eslint-disable import/no-extraneous-dependencies */
/**
 * @jsx createElement
 */
import {createElement, Component} from 'rax';
import View from 'rax-view';
import Text from '../../src/index';

const styles = {
  root: {
    width: '750rpx',
    paddingTop: '20rpx',
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
  textBlock: {
    fontWeight: '500',
    color: 'blue',
  },
  logBox: {
    padding: '20rpx',
    margin: '10rpx',
    borderWidth: '1rpx',
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
            width: '300rpx',
            textOverflow: 'ellipsis',
          }}>Single line of text exceeds truncated text</Text>

          <Text numberOfLines={2} style={{
            width: '300rpx',
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

export default App;
