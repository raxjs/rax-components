[![npm](https://img.shields.io/npm/v/rax-tab-panel.svg)](https://www.npmjs.com/package/rax-tab-panel)

该组件已废弃，推荐使用 [fusion mobile Tab 组件](https://unpkg.com/@alifd/meet-docs@2.3.2/build/tab/index.html)

## 支持

Web / Weex / 小程序

## 描述

可横向滑动的面板

## 安装

```bash
$ npm install rax-tab-panel --save
```

## 属性

1、**支持**列表中的 <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" />代表h5 <img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" />代表weex  <img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" />代表小程序


| **属性**    | **类型**   | **默认值** | **必填** | **描述**           | **支持** |
| ----------- | ---------- | ---------- | ------------ | ------------------ | ------------ |
| isPanEnabled     | `boolean` | true          |      否        | 是否可以pan来横向滑动 | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /><img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" /><img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" />  |
| isSlideEnabled | `boolean` |   true       |     否         | 是否可以有滑动slide效果        | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /><img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" /><img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" />    |
| pageConfig     | `array` | []      |  否       |    页面埋点曝光配置 如[{spmA:'a113h',spmB: 'page_0',goldLogParams: {name: 'pageName_0'}}]       | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /><img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" /><img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" />           |   
| duration     | `number` | - 250     |  否       |    切换的动画周期，单位ms(仅在useSlider:false有效)      | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /><img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" /><img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" />           |   
| easing     | `string` | cubic-bezier(0.25, 0.46, 0.45, 0.94)       |  否     |    动画缓动函数(仅在useSlider:false有效)      | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /><img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" /><img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" />           |   
| panDist     | `number` | 375     |  否       |   判断滑动方向的阈值(仅在useSlider:false有效)      | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /><img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" /><img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" />           |   
| screenNumbersPerSide     | `number` | undefined     |  否       |   定义当前tabPanel两侧需要保留的panel数量，默认全部保留      | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /><img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" /><img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" />           |   
| extraBindingProps     | `array` | []     |  否       |   根据tabPanel滑动所需进行的额外的binding效果 如：[{element: this.refs.wrap,property: 'transform.translateX',expression:'x+0'}]    | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /><img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" /><img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" />           |  
| beforeSwitch     | `function` | noop     |  否       |   切换到某个tab之前    | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /><img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" /><img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" />           |  
| afterSwitch     | `function` | noop     |  否       |   换到某个tab之后   | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /><img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" /><img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" />           |  
| onViewAppear     | `function` | noop      |  否       |   页面可见时触发(透传document的onViewAppear)     | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /><img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" /><img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" />           |  
| onViewDisAppear     | `function` | noop    |  否       |   页面不可见时触发(透传document的onViewDisAppear)    | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /><img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" /><img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" />           |
| useSlider     | `boolean` | false    |  否       |   是否用weex的<slider>组件来渲染   | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /><img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" /><img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" />           |  
| forbidSwipeBackOnIOS     | `boolean,string` | auto    |  否       |   是否阻止IOS上默认的侧滑返回功能，默认'auto'会在第0个panel时解除阻止   | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /><img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" /><img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" />           |  
| defaultFocusIndex     | `Number` | 0    |  否       |   默认聚焦到第几个panel   | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /><img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" /><img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" />           |  
| bounce     | `boolean` | true |  否       |   滑动到边缘是否有会弹效果(useSlider下无效)   | <img alt="browser" src="https://gw.alicdn.com/tfs/TB1uYFobGSs3KVjSZPiXXcsiVXa-200-200.svg" width="25px" height="25px" /><img alt="weex" src="https://gw.alicdn.com/tfs/TB1jM0ebMaH3KVjSZFjXXcFWpXa-200-200.svg" width="25px" height="25px" /><img alt="miniApp" src="https://gw.alicdn.com/tfs/TB1bBpmbRCw3KVjSZFuXXcAOpXa-200-200.svg" width="25px" height="25px" />           |  
## 示例

[在线 Demo](https://jsplayground.taobao.org/raxplayground/cc5241c1-3e00-4830-b5d0-aa375fb977cb)

```js
import { createElement, Component, render, createRef } from 'rax';
import findDOMNode from 'rax-find-dom-node';
import View from 'rax-view';
import Text from 'rax-text';
import DU from 'driver-universal';

import {
  TabController,
  TabPanel,
  TabPanelView,
  TabPanelLink
} from 'rax-tab-panel';
import transition from 'universal-transition';
import ScrollView from 'rax-scrollview';
import { isWeex } from 'universal-env';

function combineStyle(style1, style2) {
  return Object.assign({}, style1, style2);
}

const FULL_WIDTH = 750;

const DURATION = 250;

const styles = {
  tabBar: {
    top: '100rpx'
  },
  page: {},
  pageTxt: {
    fontSize: '60rpx',
    lineHeight: '200rpx',
    textAlign: 'center'
  }
};
let listData = [
  { name1: 'tom' },
  { name1: 'tom' },
  { name1: 'tom' },
  { name1: 'tom' },
  { name1: 'tom' },
  { name1: 'tom' },
  { name1: 'tom' },
  { name1: 'tom' },
  { name1: 'tom' },
  { name1: 'tom' },
  { name1: 'tom' },
  { name1: 'tom' },
  { name1: 'tom' },
  { name1: 'tom' },
  { name1: 'tom' },
  { name1: 'tom' },
  { name1: 'tom' },
  { name1: 'tom' },
  { name1: 'tom' },
  { name1: 'tom' },
  { name1: 'tom' },
  { name1: 'tom' },
  { name1: 'tom' },
  { name1: 'tom' },
  { name1: 'tom' },
  { name1: 'tom' },
  { name1: 'tom' },
  { name1: 'tom' },
  { name1: 'tom' },
  { name1: 'tom' },
  { name1: 'tom' },
  { name1: 'tom' },
  { name1: 'tom' },
  { name1: 'tom' },
  { name1: 'tom' },
  { name1: 'tom' },
  { name1: 'tom' },
  { name1: 'tom' },
  { name1: 'tom' },
  { name1: 'tom' },
  { name1: 'tom' },
  { name1: 'tom' },
  { name1: 'tom' },
  { name1: 'tom' },
  { name1: 'tom' },
  { name1: 'tom' },
  { name1: 'tom' },
  { name1: 'tom' }
];

const tabStyles = {
  container: {
    height: '100rpx'
  },
  scrollContent: {
    flexDirection: 'row',
    position: 'relative'
  },
  item: {
    width: '187.5rpx',
    height: '100rpx',
    position: 'relative'
  },
  itemTxt: {
    fontSize: '50rpx',
    lineHeight: '100rpx',
    textAlign: 'center'
  },
  block: {
    height: '100rpx',
    position: 'absolute',
    left: 0,
    top: 0,
    backgroundColor: 'red'
  }
};

const tabItemWidth = [200, 250, 400, 250, 250];

const itemData = [
  {
    name: 'tab1',
    href: '//rax.alibaba-inc.com'
  },
  {
    name: 'tab2',
    href: '//rax.alibaba-inc.com'
  },
  {
    name: 'tab3',
    href: '//rax.alibaba-inc.com'
  },
  {
    name: 'tab4',
    href: '//rax.alibaba-inc.com'
  },
  {
    name: 'tab5',
    href: '//rax.alibaba-inc.com'
  }
];

function getLeft(widths, index) {
  let left = 0;
  for (let i = 0; i < index; i++) {
    left += widths[i];
  }
  return left;
}

class Tab extends Component {
  constructor(props) {
    super(props);
    this.scroller = createRef();
    this.block = createRef();
  }

  componentDidMount() {}

  switchTo(index, options = { duration: DURATION }) {
    let { type, duration } = options;
    let { beforeSwitch = () => {}, afterSwitch = () => {} } = this.props;
    let block = findDOMNode(this.block.current);
    let left = getLeft(tabItemWidth, index);
    let itemWidth = tabItemWidth[index];

    beforeSwitch({
      index,
      type
    });

    // move block
    transition(
      block,
      {
        transform: `translateX(${left}rpx)`,
        webkitTransform: `translateX(${left}rpx)`,
        width: `${itemWidth}rpx`
      },
      {
        timingFunction: 'ease-out',
        delay: 0,
        duration: 200
      },
      () => {
        afterSwitch({
          index,
          type
        });
      }
    );
    let offset =
      left - FULL_WIDTH / 2 + itemWidth / 2 < 0
        ? 0
        : left - FULL_WIDTH / 2 + itemWidth / 2;

    this.scroller.current.scrollTo({ x: offset });
  }

  render() {
    let { itemWidths, itemData } = this.props;

    let containerWidth = 0;
    for (let i = 0; i < itemWidths.length; i++) {
      containerWidth += itemWidths[i];
    }

    return (
      <ScrollView
        {...this.props}
        contentContainerStyle={{ width: containerWidth }}
        style={combineStyle({ ...this.props.style }, { display: 'block' })}
        horizontal={true}
        ref={this.scroller}
      >
        <View style={tabStyles.scrollContent}>
          <View
            style={combineStyle(tabStyles.block, { width: itemWidths[0] })}
            ref={this.block}
          />
          {itemData.map((item, i) => {
            return (
              <View
                style={combineStyle(tabStyles.item, { width: itemWidths[i] })}
                onClick={() => this.switchTo(i, { type: 'click' })}
              >
                <Text style={tabStyles.itemTxt}>{item.name}</Text>
              </View>
            );
          })}
        </View>
      </ScrollView>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.tab = createRef();
    this.tabBar = createRef();
  }

  state = {};

  componentWillMount() {}

  componentDidMount() {}

  getTabBlockRef = () => {
    return this.tab.current.refs.block;
  };

  beforeTabBarSwitch = e => {
    this.tab.current.switchTo(e.index);
  };

  afterTabBarSwitch = e => {};

  beforeTabSwitch = e => {
    if (e.type === 'click') {
      this.tabBar.current.switchTo(e.index);
    }
  };

  render() {
    return (
      <View style={{ width: 750, position: 'absolute', top: 0, bottom: 0 }}>
        <Tab
          itemWidths={tabItemWidth}
          itemData={itemData}
          style={tabStyles.container}
          ref={this.tab}
          beforeSwitch={this.beforeTabSwitch}
        />
        <TabController
          isPanEnabled={true}
          isSlideEnabled={true}
          style={styles.tabBar}
          ref={this.tabBar}
          beforeSwitch={this.beforeTabBarSwitch}
          afterSwitch={this.afterTabBarSwitch}
        >
          <TabPanel style={styles.page}>
            <TabPanelView style={{ flex: 1 }}>{1}</TabPanelView>
          </TabPanel>
          <TabPanel style={styles.page}>
            <Text>2</Text>
          </TabPanel>
          <TabPanel style={styles.page}>
            <Text>3</Text>
          </TabPanel>
          <TabPanel style={styles.page}>
            <Text>4</Text>
          </TabPanel>
          <TabPanel style={styles.page}>
            <Text>5</Text>
          </TabPanel>
        </TabController>
      </View>
    );
  }
}
render(<App />, document.body, { driver: DU });
```