
import {createElement, Component, render} from 'rax';
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
    }, 1000);
  }


  render() {
    return (<View style={{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0}}>
      <View>first module</View>
      <Waterfall
        columnWidth={150}
        columnCount={4}
        columnGap={50}
        dataSource={this.state.dataSource}
        renderHeader={() => {
          return [
            <RefreshControl
              key="0"
              refreshing={this.state.refreshing}
              onRefresh={this.handleRefresh}>
              <Text>下拉刷新</Text>
            </RefreshControl>,
            <View key="1" style={{width: 750, height: 100, backgroundColor: 'yellow', marginBottom: 20}}>header1</View>,
            <View key="2" style={{width: 750, height: 100, backgroundColor: 'green', marginBottom: 20}}>header2</View>
          ];
        }}
        renderFooter={() => {
          return <View key="3" style={{width: 750, height: 300, backgroundColor: 'blue', marginTop: 20}}>footer1</View>;
        }}
        renderItem={(item, index) => {
          return (<View key={'item_' + index} style={{height: item.height, backgroundColor: 'red', marginBottom: 20}}>
            <Text>{index}</Text>
            {/* {index} */}
          </View>);
        }}
        onEndReached={this.loadMore} />
    </View>);
  }
}

render(<App />, document.body, { driver: DU });