---
title: Baisc
order: 1
---

basic usage

```jsx
import { createElement, Component } from 'rax';
import View from 'rax-view';
import { Swiper, SwiperSlide } from '../src/index';

let swiperEle;
export default class App extends Component {
  constructor(props) {
    super(props);
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
          autoplay={false}
          interval={2000}
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
          <SwiperSlide key="1">
            <View style={{height: '300rpx'}}>Slide 1</View>
          </SwiperSlide>
          <SwiperSlide key="2">
            <View style={{height: '300rpx'}}>Slide 2</View>
          </SwiperSlide>
          <SwiperSlide key="3">
            <View style={{height: '300rpx'}}>Slide 3</View>
          </SwiperSlide>
          <SwiperSlide key="4">
            <View style={{height: '300rpx'}}>Slide 4</View>
          </SwiperSlide>
        </Swiper>
        <View onClick={this.onClick}>Click</View>
      </View>
    );
  }
}
```
