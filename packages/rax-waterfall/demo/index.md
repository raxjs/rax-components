
---
title: Baisc
order: 1
---

basic usage

```jsx

import {createElement, Component, render, createRef} from 'rax';
import View from 'rax-view';
import Text from 'rax-text';
import DU from 'driver-universal';
import RefreshControl from 'rax-refreshcontrol';
import Waterfall from '../src/index';

let dataSource = [
  { height: 550, item: {} },
  { height: 624, item: {} },
  { height: 708, item: {} },
  { height: 600, item: {} },
  { height: 300, item: {} },
  { height: 100, item: {} },
  { height: 400, item: {} },
  { height: 550, item: {} },
  { height: 624, item: {} },
  { height: 708, item: {} },
  { height: 600, item: {} },
  { height: 300, item: {} },
  { height: 100, item: {} },
  { height: 400, item: {} }
];

class App extends Component {
  constructor(props) {
    super(props);

    this.waterfallRef = createRef();
  }
 
  state = {
    refreshing: false,
    dataSource: dataSource
  }

  handleRefresh = () => {
    if (this.state.refreshing) {
      return;
    }

    this.setState({
      refreshing: true,
      dataSource: []
    });

    setTimeout(() => {
      this.setState({
        refreshing: false,
        dataSource: dataSource
      });
    }, 500);
  }

  loadMore = () => {
    setTimeout(() => {
      this.setState({
        dataSource: this.state.dataSource.concat(dataSource)
      });
    }, 500);
  }

  scrollToTop = () => {
    this.waterfallRef.current.scrollTo({
      x: 0,
      y: 0
    });
  }

  render() {
    return (<View style={{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0}}>
      <View>first module</View>
      <Waterfall
        columnWidth={150}
        columnCount={4}
        columnGap={50}
        leftGap={20}
        rightGap={20}
        ref={this.waterfallRef}
        dataSource={this.state.dataSource}
        renderHeader={() => {
          return [
            <RefreshControl
              key="0"
              refreshing={this.state.refreshing}
              onRefresh={this.handleRefresh}>
              <Text>下拉刷新</Text>
            </RefreshControl>,
            <View key="1" style={{width: 750, height: 100, backgroundColor: 'yellow', marginBottom: 20}}><Text>header1</Text></View>,
            <View key="2" style={{width: 750, height: 100, backgroundColor: 'green', marginBottom: 20}}><Text>header2</Text></View>,
          ];
        }}
        renderFooter={() => {
          return <View key="3" style={{width: 750, height: 300, backgroundColor: 'blue', marginTop: 20}}>footer1</View>;
        }}
        renderItem={(item, index) => {
          return (<View style={{height: item.height, backgroundColor: 'red', marginBottom: 20}} key={index}>
            <Text>{index}</Text>
            {/* {index} */}
          </View>);
        }}
        onEndReached={this.loadMore} />
        <View onClick={this.scrollToTop} style={{position: 'absolute', zIndex: 100, bottom: 100, right: 10, backgroundColor: 'yellow'}}><Text>scroll to top</Text></View>
    </View>);
  }
}

render(<App />, document.body, { driver: DU });
```
