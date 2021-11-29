# rax-swiper

[![npm](https://img.shields.io/npm/v/rax-swiper.svg)](https://www.npmjs.com/package/rax-swiper)

## 注意

支持 Web 和 小程序，不支持 Weex 以及 Kraken。

- 只允许在**非内联场景**中使用，即 `build.json` 中配置 `inlineStyle: false`！

## 描述

轮播组件，功能比 rax-slider 强大很多。

## 安装

```bash
$ npm install rax-swiper --save
```

## 属性

> Web 组件基于社区 swiper.js 封装，所有属性都可从 [swiper.js API](https://swiperjs.com/api/) 文档中找到。详细的属性列表可以直接到 [swiper/react 文档](https://swiperjs.com/react)查看。
> 小程序组件基于小程序 swiper 原生组件开发。

| **属性**      | **类型**          | **默认值** | **必填** | **描述**                             |
| ------------- | ----------------- | ---------- | -------- | ------------------------------------ |
| autoplay      | `boolean\|object` | false      | 否       | 是否自动播放，小程序中传入 `object` 时，与 `true` 表现一致                         |
| pagination    | `boolean\|object` | true       | 否       | 是否显示指示点，小程序中传入 `object` 时，与 `true` 表现一致                     |
| loop          | `boolean`         | true       | 否       | 是否是循环播放                       |
| initialSlide  | `number`          | 0          | 否       | 指定默认初始化第几页                 |
| onSlideChange | `function`        | -          | 否       | `index` 改变时会触发                 |
| direction     | `string`          | horizontal | 否       | 滚动方向 (`horizontal` / `vertical`) |
| interval     | `number`          | 3000 | 否       | 自动播放的间隔，单位为 ms，在 web 中此值会覆盖 pagination 中 delay 字段 |
| paginationStyle | `object`       | { itemColor: 'rgba(0, 0, 0, .3)', itemActiveColor: '#000000' } | 否 | 该属性只在小程序下有效，itemColor 为指示点的颜色， itemActiveColor 为被选中的指示点的颜色 |

## 方法

### slideNext

移动到下一个 Slide, 若当前已经处于最后一张 Slide： loop 为 true 时，移动到第一张， 否则不移动

### slidePrev()

移动到上一张 Slide, 若当前已经处于第一张 Slide：loop 为 true 时，移动到最后一张，否则不移动

### slideTo(index)

移动到位置为 index 的 Slide
## 示例

```jsx
/* eslint-disable import/no-extraneous-dependencies */
import { createElement, render, useRef } from 'rax';
import View from 'rax-view';
import { Swiper, SwiperSlide } from 'rax-swiper';
import DU from 'driver-universal';
import './index.css';

const App = () => {
  const ref = useRef(null);

  function prev() {
    ref.current.slidePrev();
  }

  function next() {
    ref.current.slideNext();
  }

  return (
    <View>
      <View onClick={prev}>Prev</View>
      <View onClick={next}>Next</View>
      <Swiper
        onSlideChange={e => console.log(e)}
        ref={ref}
        autoplay={true}
      >
        <SwiperSlide key="1"><View style={{ height: 300 }}>1</View></SwiperSlide>
        <SwiperSlide key="2"><View style={{ height: 300 }}>2</View></SwiperSlide>
        <SwiperSlide key="3"><View style={{ height: 300 }}>3</View></SwiperSlide>
        <SwiperSlide key="4"><View style={{ height: 300 }}>4</View></SwiperSlide>
      </Swiper>
    </View>
  );
}

render(<App />, document.body, { driver: DU });
```

在 Web 中，如果需要使用到 swiper.js 中的一些能力，可能需要配置插件：

```js
import SwiperCore, { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'rax-swiper';

SwiperCore.use(Pagination);

// 如果需要配置多个插件
// 可以传入一个数组
SwiperCore.use([...]);
```

相应的能力包括 Pagination、Zoom、Lazy 等，详细列表请到 [swiper/react 文档](https://swiperjs.com/react#usage)查看。
