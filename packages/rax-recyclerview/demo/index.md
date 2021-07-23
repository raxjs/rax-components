---
title: Baisc
order: 1
---

basic usage

```jsx

import { createElement, Component, render } from "rax";

import View from "rax-view";

import Text from "rax-text";

import DriverUniversal from "driver-universal";

import RecyclerView from "rax-recyclerview";

class Thumb extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

  render() {
    return (
      <RecyclerView.Cell>
        <View style={styles.button}>
          <View style={styles.box} />
        </View>
      </RecyclerView.Cell>
    );
  }
}

class Row extends Component {
  handleClick = e => {
    this.props.onClick(this.props.data);
  };

  render() {
    return (
      <View onClick={this.handleClick}>
        <View style={styles.row}>
          <Text style={styles.text}>
            {this.props.data.text + " (" + this.props.data.clicks + " clicks)"}
          </Text>
        </View>
      </View>
    );
  }
}

const THUMBS = [];

for (let i = 0; i < 20; i++) THUMBS.push(i);

const createThumbRow = (val, i) => <Thumb key={i} />;

class App extends Component {
  state = {
    horizontalScrollViewEventLog: false,
    scrollViewEventLog: false
  };

  render() {
    return (
      <View style={styles.root}>
        <View style={styles.container}>
          <RecyclerView
            ref={scrollView => {
              this.scrollView = scrollView;
            }}
            style={{
              height: 500
            }}
            onEndReached={() => alert("reach end")}
          >
            <RecyclerView.Header style={styles.sticky}>
              <Text>Sticky view is not header</Text>​{" "}
            </RecyclerView.Header>
            <RecyclerView.Header>
              <View style={styles.sticky}>
                <Text>Sticky view must in header root</Text>
              </View>
            </RecyclerView.Header>
            {THUMBS.map(createThumbRow)}
          </RecyclerView>
          <View
            style={styles.button}
            onClick={() => this.scrollView.scrollTo({ y: 0 })}
          >
            <Text>Scroll to top</Text>
          </View>
          <View style={styles.eventLogBox}>
            <Text>{this.state.scrollViewEventLog ? "onEndReached" : ""}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = {
  root: {
    width: 750,
    paddingTop: 20
  },

  sticky: {
    position: "sticky",
    width: 750,
    backgroundColor: "#cccccc"
  },

  container: {
    padding: 20,
    borderStyle: "solid",
    borderColor: "#dddddd",
    borderWidth: 1,
    marginLeft: 20,
    height: 1000,
    marginRight: 20,
    marginBottom: 10
  },

  button: {
    margin: 7,
    padding: 5,
    alignItems: "center",
    backgroundColor: "#eaeaea",
    borderRadius: 3
  },

  box: {
    width: 64,
    height: 64
  },

  eventLogBox: {
    padding: 10,
    margin: 10,
    height: 80,
    borderWidth: 1,
    borderColor: "#f0f0f0",
    backgroundColor: "#f9f9f9"
  },

  row: {
    borderColor: "grey",
    borderWidth: 1,
    padding: 20,
    margin: 5
  },

  text: {
    alignSelf: "center",
    color: "black"
  },

  refreshView: {
    height: 80,
    width: 750,
    justifyContent: "center",
    alignItems: "center"
  },

  refreshArrow: {
    fontSize: 30,
    color: "#45b5f0"
  }
};

render(<App />, document.body, { driver: DriverUniversal });
```
