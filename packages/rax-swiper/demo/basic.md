---
title: Baisc
order: 1
---

basic usage

```jsx
import { createElement, Component, createRef } from 'rax';
import View from 'rax-view';
import { Swiper, SwiperSlide } from 'rax-swiper';

let swiperEle;
export default class App extends Component {
  constructor(props) {
    super(props);
    this.inputRef = createRef();
    this.state = {
      data: [],
    };
  }

  onClick = () => {
    swiperEle.slideNext();
  }

  render() {
    return (
      <View style={{
        width: '750rpx'
      }}>
        <Swiper
          autoplay={true}
          loop={true}
          style={{
            height: '300rpx',
            width: '750rpx'
          }}
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => swiperEle = swiper}
          pagination={{ clickable: true }}
          initialSlide={2}
        >
          <SwiperSlide key="1">Slide 1</SwiperSlide>
          <SwiperSlide key="2">Slide 2</SwiperSlide>
          <SwiperSlide key="3">Slide 3</SwiperSlide>
          <SwiperSlide key="4">Slide 4</SwiperSlide>
        </Swiper>
        <View onClick={this.onClick}>Click</View>
      </View>
    );
  }
}
```
