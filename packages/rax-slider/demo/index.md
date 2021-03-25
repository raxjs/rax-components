---
title: Baisc
order: 1
---

basic usage

```jsx
/* eslint-disable import/no-extraneous-dependencies */
import { createElement, Component, render, createRef } from 'rax';
import View from 'rax-view';
import Image from 'rax-image';
import Slider from '../src/index';
import DU from 'driver-universal';
import './index.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.inputRef = createRef();
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    this.setState({
      data: [
        // 红蓝灰
        '//gw.alicdn.com/tfs/TB19NbqKFXXXXXLXVXXXXXXXXXX-750-500.png',
        '//gw.alicdn.com/tfs/TB1tWYBKFXXXXatXpXXXXXXXXXX-750-500.png',
        '//gw.alicdn.com/tfs/TB1SX_vKFXXXXbyXFXXXXXXXXXX-750-500.png'
      ]
    });
  }

  onchange = (e) => {
    console.log('change', e);
  }

  onClick = (direction) => {
    if (direction === 'go(0)') {
      this.inputRef.current.slideTo(0);
    } else {
      this.inputRef.current.slideTo(this.inputRef.current.index + (direction === 'prev' ? -1 : 1));
    }
  }

  render() {
    return (
      <View>
        <Slider
          className="slider"
          width={750}
          height={500}
          autoPlay={true}
          index={2}
          loop={true}
          speed={300}
          cssEase="linear"
          showsPagination={true}
          paginationStyle={{
            position: 'absolute',
            width: '750rpx',
            height: '40rpx',
            bottom: '20rpx',
            left: 0,
            itemColor: 'rgba(255, 255, 255, 0.5)',
            itemSelectedColor: 'rgb(255, 80, 0)',
            itemSize: '16rpx'
          }}
          autoplayInterval={2000}
          onChange={this.onchange}
          ref={this.inputRef}
        >
          {this.state.data.map((item, index) => (
            <View key={item} className="itemWrap">
              <p className="text">index: {index}</p>
              <Image className="image" source={{ uri: item }} />
            </View>))}
        </Slider>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
          <View onClick={this.onClick.bind(this, 'prev')}>prev</View>
          <View onClick={this.onClick.bind(this, 'next')}>next</View>
          <View onClick={this.onClick.bind(this, 'go(0)')}>go(0)</View>
        </View>
      </View>
    );
  }
}

export default App;
```
