/* eslint-disable import/no-extraneous-dependencies */
import { createElement, render, Component } from 'rax';
import DU from 'driver-universal';
import View from 'rax-view';
import Icon, { createIconSet } from '../src/index';

const IconFont = createIconSet({
  'square_check': '\ue6d6',
  'square': '\ue6d5'
}, 'raxjs', 'https://at.alicdn.com/t/font_1368263_h562gmaj6yq.ttf');

class Demo extends Component {
  render() {
    return (
      <View>
        <Icon
          source={{
            uri: 'https://at.alicdn.com/t/font_1368263_h562gmaj6yq.ttf',
            codePoint: '\ue6d5'
          }}
          fontFamily="raxjs"
        />
        <IconFont name="square_check" size={40}/>
        <IconFont name="square" size={50}/>
      </View>
    );
  }
}

render(<Demo />, document.body, { driver: DU });
