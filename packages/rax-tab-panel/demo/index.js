import { createElement, Component, render, createRef } from 'rax';
import findDOMNode from 'rax-find-dom-node';
import View from 'rax-view';
import Text from 'rax-text';
import DU from 'driver-universal';

import {
  TabController,
  TabPanel,
  TabPanelView,
} from '../src/index.js';
import transition from 'universal-transition';
import ScrollView from 'rax-scrollview';

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
          defaultFocusIndex={1}
        >
          <TabPanel key="1" style={styles.page}>
            <TabPanelView style={{ flex: 1 }}>{1}</TabPanelView>
          </TabPanel>
          <TabPanel key="2" style={styles.page}>
            <Text>2</Text>
          </TabPanel>
          <TabPanel key="3" style={styles.page}>
            <Text>3</Text>
          </TabPanel>
          <TabPanel key="4" style={styles.page}>
            <Text>4</Text>
          </TabPanel>
          <TabPanel key="5" style={styles.page}>
            <Text>5</Text>
          </TabPanel>
        </TabController>
      </View>
    );
  }
}
render(<App />, document.body, { driver: DU });
