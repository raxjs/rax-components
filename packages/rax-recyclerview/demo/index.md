---
title: Baisc
order: 1
---

basic usage

```jsx

import {createElement, Component, render} from 'rax';
import DriverUniversal from 'driver-universal';
import View from 'rax-view';
import Text from 'rax-text';
import {isWeex} from 'universal-env';
import RecyclerView from '../src/index';

const vwh = isWeex ? 667 * 2 : document.documentElement.clientHeight * 750 / document.documentElement.clientWidth;

class Thumb extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

  render() {
    if (isWeex) {
      return (
        <RecyclerView.Cell style={this.props.style}>
          <View style={styles.button}>
            <View style={styles.box}>
              <Text>{this.props.index}</Text>
            </View>
          </View>
        </RecyclerView.Cell>
      );
    }
    return (
      <View style={styles.button}>
        <View style={styles.box}>
          <Text>{this.props.index}</Text>
        </View>
      </View>
    );
  }
}

let THUMBS = [];
for (let i = 0; i < 30; i++) THUMBS.push(i);
let createThumbRow = (val, i) => <Thumb key={i} index={i} />;

export default class App extends Component {
  state = {
    horizontalScrollViewEventLog: false,
    scrollViewEventLog: false,
  };

  render() {
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
            onEndReached={() => console.log('reach end')}
            itemSize={270}>
            <RecyclerView.Header style={styles.header}>
              <Text style={styles.headerText}>Simple Header</Text>
            </RecyclerView.Header>

            {THUMBS.map(createThumbRow)}

          </RecyclerView>

          <View
            style={styles.topIcon}
            onClick={() => this.scrollView.scrollTo({y: 0})}>
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
    backgroundColor: 'tomato',
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
    width: 64,
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
  }
};

render(<App />, document.body, { driver: DriverUniversal });
```
