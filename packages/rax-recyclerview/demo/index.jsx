import {createElement, Component, render, createRef} from 'rax';
import findDOMNode from 'rax-find-dom-node';
import View from 'rax-view';
import Text from 'rax-text';
import ScrollView from 'rax-scrollview';
import DU from 'driver-universal';
import { TabController, TabPanel, TabPanelView, TabPanelLink } from 'rax-tab-panel';
import transition from 'universal-transition';
import { isWeb } from 'universal-env';

import Simple from './simple';
import TabBar from './tabbar';
import Slider from './slider';

const DURATION = 250;

const FULL_WIDTH = 750;

const tabItemWidth = [200, 200, 200];

const itemData = [
  {
    name: 'Simple',
    href: '//rax.alibaba-inc.com'
  },
  {
    name: 'TabBar',
    href: '//rax.alibaba-inc.com'
  },
  {
    name: 'Slider',
    href: '//rax.alibaba-inc.com'
  }
];

if (isWeb) {
  let styleNode = document.createElement('style');
  document.head.appendChild(styleNode);
  styleNode.innerHTML = '* { margin: 0; }';
}
class App extends Component {
  lastScrollTop = 0;

  constructor(props) {
    super(props);

    this.tab = createRef();
    this.tabBar = createRef();
  }

  componentDidMount() {
  }

  beforeTabSwitch = e => {
    if (e.type === 'click') {
      this.tabBar.current.switchTo(e.index);
    }
  };

  beforeTabBarSwitch = e => {
    this.tab.current.switchTo(e.index);
    this.setState({
      index: e.index
    });
  };

  afterTabBarSwitch = e => {};

  render() {
    return (
      <View style={styles.root}>
        <Tab
          itemWidths={tabItemWidth}
          itemData={itemData}
          style={{
            height: 100,
            width: 700
          }}
          ref={this.tab}
          beforeSwitch={this.beforeTabSwitch}
        />
        <TabController
          isPanEnabled={true}
          isSlideEnabled={true}
          style={{
            ...styles.tabBar,
          }}
          ref={this.tabBar}
          beforeSwitch={this.beforeTabBarSwitch}
          afterSwitch={this.afterTabBarSwitch}
        >
          <TabPanel style={styles.page}>
            <TabPanelView>
              <Simple />
            </TabPanelView>
          </TabPanel>
          <TabPanel style={styles.page}>
            <TabPanelView>
              <TabBar />
            </TabPanelView>
          </TabPanel>
          <TabPanel style={styles.page}>
            <TabPanelView>
              <Slider />
            </TabPanelView>
          </TabPanel>
        </TabController>
      </View>
    );
  }
}

function getLeft(widths, index) {
  let left = 0;
  for (let i = 0; i < index; i++) {
    left += widths[i];
  }
  return left;
}

function combineStyle(style1, style2) {
  return Object.assign({}, style1, style2);
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
        transform: `translateX(${left}rem)`,
        webkitTransform: `translateX(${left}rem)`,
        width: `${itemWidth}rem`
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

const tabStyles = {
  container: {
    height: 100
  },
  scrollContent: {
    flexDirection: 'row',
    position: 'relative'
  },
  item: {
    width: 187.5,
    height: 100,
    position: 'relative'
  },
  itemTxt: {
    fontSize: 30,
    lineHeight: 100,
    textAlign: 'center'
  },
  block: {
    height: 100,
    position: 'absolute',
    left: 0,
    top: 0,
    backgroundColor: '#ff9a46',
    color: 'white'
  }
};

let styles = {
  root: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
  tabBar: {
    top: 100
  },
  page: {
    flex: 1
  }
};

render(<App />, document.body, { driver: DU });
