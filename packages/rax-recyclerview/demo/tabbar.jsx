import {createElement, Component, render, createRef} from 'rax';
import findDOMNode from 'rax-find-dom-node';
import View from 'rax-view';
import Text from 'rax-text';
import ScrollView from 'rax-scrollview';
import { TabController, TabPanel, TabPanelView, TabPanelLink } from 'rax-tab-panel';
import transition from 'universal-transition';

import RecyclerView from '../src/index';

const vwh = document.documentElement.clientHeight * 750 / document.documentElement.clientWidth;

const DURATION = 250;
const FULL_WIDTH = 750;

class Thumb extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

  render() {
    return (
      <RecyclerView.Cell style={this.props.style}>
        <View style={styles.button}>
          <View style={styles.box}>
            <Text>第{this.props.sliderIndex}个 slider: {this.props.index}</Text>
          </View>
        </View>
      </RecyclerView.Cell>
    );
  }
}

let THUMBS1 = [];
for (let i = 0; i < 30; i++) THUMBS1.push(i);
let THUMBS2 = [];
for (let i = 0; i < 30; i++) THUMBS2.push(i);
let createThumbRow = (val, i, sliderIndex) => <Thumb key={i} index={i} sliderIndex={sliderIndex} />;

const CHILD_GROUP = [THUMBS1, THUMBS2];

const tabItemWidth = [200, 250];

const itemData = [
  {
    name: 'tab1',
    href: '//rax.alibaba-inc.com'
  },
  {
    name: 'tab2',
    href: '//rax.alibaba-inc.com'
  }
];

export default class App extends Component {
  lastScrollTop = 0;

  constructor(props) {
    super(props);

    this.tab = createRef();
    this.tabBar = createRef();
    this.nestedChild0 = createRef();
    this.nestedChild1 = createRef();
    this.state = {
      horizontalScrollViewEventLog: false,
      scrollViewEventLog: false,
      listHeight: THUMBS1.length * 270,
      activeIndex: 0,
    };
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
      activeIndex: e.index
    });
  };

  afterTabBarSwitch = e => {};

  render() {
    const { listHeight } = this.state;

    return (
      <View style={styles.root}>
        <View style={styles.container}>
          <RecyclerView
            ref={(scrollView) => {
              this.scrollView = scrollView;
            }}
            style={{
              height: vwh
            }}
            nestedList={true}
            onEndReached={() => console.log('reach end')}
          >
            <RecyclerView.Header style={styles.header}>
              <Text style={styles.headerText}>TabBar Header</Text>
            </RecyclerView.Header>
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
                height: listHeight,
                position: 'relative',
              }}
              ref={this.tabBar}
              beforeSwitch={this.beforeTabBarSwitch}
              afterSwitch={this.afterTabBarSwitch}
            >
              {CHILD_GROUP.map((data, childIndex) => {
                return (
                  <TabPanel style={styles.page}>
                    <TabPanelView>
                      <RecyclerView.NestedList
                        itemSize={270}
                        height={vwh}
                        active={this.state.activeIndex === childIndex}
                      >
                        {data.map((value, i) => createThumbRow(value, i, childIndex + 1))}
                      </RecyclerView.NestedList>
                    </TabPanelView>
                  </TabPanel>
                );
              })}
            </TabController>
          </RecyclerView>

          <View
            style={styles.topIcon}
            onClick={() => this.scrollView.scrollTo({y: 0})}
          >
            <Text>Top</Text>
          </View>
        </View>
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
    backgroundColor: 'yellowgreen'
  }
};

let styles = {
  root: {
    width: 750
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 750,
    height: 350,
    backgroundColor: 'tomato'
  },
  headerText: {
    color: 'white',
    fontSize: 40,
  },
  sticky: {
    position: 'sticky',
    width: 750,
    backgroundColor: '#cccccc'
  },
  container: {
    borderStyle: 'solid',
    borderColor: '#dddddd',
    height: vwh,
    backgroundColor: '#eeeeee',
  },
  button: {
    backgroundColor: '#ffffff',
    width: 710,
    height: 250,
    marginTop: 20,
    marginLeft: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  box: {
    height: 64,
  },
  eventLogBox: {
    padding: 10,
    margin: 10,
    height: 80,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    backgroundColor: '#f9f9f9',
  },
  row: {
    borderColor: 'grey',
    borderWidth: 1,
    padding: 20,
    margin: 5,
  },
  text: {
    alignSelf: 'center',
    color: 'black',
  },
  refreshView: {
    height: 80,
    width: 750,
    justifyContent: 'center',
    alignItems: 'center'
  },
  refreshArrow: {
    fontSize: 30,
    color: '#45b5f0'
  },
  topIcon: {
    position: 'fixed',
    right: 40,
    bottom: 40,
    width: 100,
    height: 100,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: '#cccccc',
    borderRadius: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    cursor: 'pointer',
  },
  slider: {
    width: 750,
  },
  tabBar: {
  },
  page: {},
  pageTxt: {
    fontSize: 60,
    lineHeight: 200,
    textAlign: 'center'
  }
};
