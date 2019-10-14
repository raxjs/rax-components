import {createElement, Component, render, findNodeDOM} from 'rax';
import View from 'rax-view';
import Text from 'rax-text';
import Slider from 'rax-slider';

import RecyclerView from '../src/index';

const vwh = document.documentElement.clientHeight * 750 / document.documentElement.clientWidth;

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

export default class App extends Component {
  lastScrollTop = 0;
  state = {
    horizontalScrollViewEventLog: false,
    scrollViewEventLog: false,
    listHeight: THUMBS1.length * 270,
    activeIndex: 0,
  };

  componentDidMount() {
  }

  onChange = (value) => {
    this.setState({
      activeIndex: value.index
    });
  };

  render() {
    const { activeIndex } = this.state;
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
              <Text style={styles.headerText}>Slider Header</Text>
            </RecyclerView.Header>

            <Slider
              width="750"
              height={this.state.listHeight}
              style={{
                ...styles.slider,
                height: this.state.listHeight
              }}
              autoPlay={false}
              loop={false}
              showsPagination={false}
              onChange={this.onChange}
            >
              {CHILD_GROUP.map((data, childIndex) => {
                return (
                  <RecyclerView.NestedList
                    itemSize={270}
                    height={vwh}
                    active={activeIndex === childIndex}
                  >
                    {THUMBS1.map((value, i) => createThumbRow(value, i, childIndex + 1))}
                  </RecyclerView.NestedList>
                );
              })}
            </Slider>
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
    // borderWidth: 1,
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
  }
};
