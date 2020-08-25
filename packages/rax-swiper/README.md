[![npm](https://img.shields.io/npm/v/rax-swiper.svg)](https://www.npmjs.com/package/rax-swiper)

## 描述

轮播组件，体验远远好于 rax-slider.

## 安装

```bash
$ npm install rax-swiper --save
```

## 属性

注：只支持 Web

| **属性**         | **类型**   | **默认值** | **必填** | **描述**                               | 
| ---------------- | ---------- | ---------- | -------- | -------------------------------------- |
| autoPlay         | `boolean|object`  | false      | 否       | 是否自动播放                           |
| pagination  | `boolean|object`  | true       | 否       | 是否显示指示点                         | 
| loop             | `boolean`  | true       | 否       | 是否是循环播放                         | 
| initialSlide            | `number`   | 0          | 否       | 指定默认初始化第几页                   |
| onChange         | `function` | -          | 否       | `index` 改变时会触发                   | 
| direction         | `string` | horizontal   | 否       |  滚动方向 (`horizontal` / `vertical`)            | 

## 示例

```jsx
/* eslint-disable import/no-extraneous-dependencies */
import { createElement, Component, render, createRef } from 'rax';
import View from 'rax-view';
import {Swiper, SwiperSlide} from '../src/index';
import DU from 'driver-universal';
import './index.css';

let swiperEle;
class App extends Component {
  constructor(props) {
    super(props);
    this.inputRef = createRef();
    this.state = {
      data: [],
    };
  }

  onchange = (e) => {
    console.log('change', e);
  }

  onClick = () => {
    swiperEle.slideNext();
  }

  render() {
    return (
      <View style={{
        width: 750
      }}>
        <Swiper
          autoplay={true}
          loop={true}
          style={{
            height: 300,
            width: 750
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

render(<App />, document.body, { driver: DU });
```
