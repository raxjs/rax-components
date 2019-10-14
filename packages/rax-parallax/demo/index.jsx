/* eslint-disable import/no-extraneous-dependencies */
import { createElement, Component, render, createRef } from 'rax';
import View from 'rax-view';
import Text from 'rax-text';
import RecyclerView from 'rax-recyclerview';
import Image from 'rax-image';
import DU from 'driver-universal';
import Parallax from '../src/index';

let listData = [
  { name1: 'tom' }, { name1: 'tom' }, { name1: 'tom' },
  { name1: 'tom' }, { name1: 'tom' }, { name1: 'tom' },
  { name1: 'tom' }, { name1: 'tom' }, { name1: 'tom' },
  { name1: 'tom' }, { name1: 'tom' }, { name1: 'tom' },
  { name1: 'tom' }, { name1: 'tom' }, { name1: 'tom' },
  { name1: 'tom' }, { name1: 'tom' }, { name1: 'tom' },
  { name1: 'tom' }, { name1: 'tom' }, { name1: 'tom' },
  { name1: 'tom' }, { name1: 'tom' }, { name1: 'tom' },
  { name1: 'tom' }, { name1: 'tom' }, { name1: 'tom' },
  { name1: 'tom' }, { name1: 'tom' }, { name1: 'tom' },
  { name1: 'tom' }, { name1: 'tom' }, { name1: 'tom' },
  { name1: 'tom' }, { name1: 'tom' }, { name1: 'tom' },
  { name1: 'tom' }, { name1: 'tom' }, { name1: 'tom' },
  { name1: 'tom' }, { name1: 'tom' }, { name1: 'tom' },
  { name1: 'tom' }, { name1: 'tom' }, { name1: 'tom' },
  { name1: 'tom' }, { name1: 'tom' }, { name1: 'tom' },
];


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      data: listData
    };
    this.bindingScroller = createRef();
  }

  listLoading = () => {
    if (this.state.index < 4) {
      return (
        <View style={styles.loading}>
          <Text style={styles.text}>loading...</Text>
        </View>
      );
    } else {
      return null;
    }
  }
  listItem = (item, index) => {
    if (index % 2 == 0) {
      return (
        <RecyclerView.Cell>
          <View style={styles.item1}>
            <Text style={styles.text}>{item.name1}</Text>
          </View>
        </RecyclerView.Cell>

      );
    } else {
      return (
        <RecyclerView.Cell>
          <View style={styles.item2}>
            <Text style={styles.text}>{item.name1}</Text>
          </View>
        </RecyclerView.Cell>

      );
    }
  }
  handleLoadMore = () => {
    setTimeout(() => {
      this.state.index++;
      if (this.state.index < 5) {
        this.state.data.push(
          { name1: 'loadmore 2' },
          { name1: 'loadmore 3' },
          { name1: 'loadmore 4' },
          { name1: 'loadmore 5' },
          { name1: 'loadmore 2' },
          { name1: 'loadmore 3' },
          { name1: 'loadmore 4' },
          { name1: 'loadmore 5' }
        );
      }
      this.setState(this.state);
    }, 1000);
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        bindingScroller: this.bindingScroller
      });
    }, 100);
  }

  render() {
    let dataSource = this.state.data;
    return (
      <View style={styles.container}>
        <Parallax
          bindingScroller={this.bindingScroller}
          transform={[
            {
              type: 'translate',
              in: [0, 660],
              out: [0, 0, 0, -660] // [x1,y1,x2,y2]
            },
            {
              type: 'scale',
              in: [-150, 0],
              out: [1.3, 1.3, 1, 1] // [x1,y1,x2,y2]
            }
          ]}>
          <Image style={{ width: 750, height: 576 }}
            source={{ uri: '//gw.alicdn.com/tfs/TB12DNfXMmTBuNjy1XbXXaMrVXa-750-576.png' }} />
        </Parallax>
        <RecyclerView
          ref={this.bindingScroller}
          style={styles.list}
          onEndReached={this.handleLoadMore}
        >
          <RecyclerView.Cell>
            <View style={styles.title}>
              <Text style={styles.text}>header</Text>
            </View>
          </RecyclerView.Cell>
          {dataSource.map(this.listItem)}
          <RecyclerView.Cell>
            {this.listLoading()}
          </RecyclerView.Cell>
        </RecyclerView>
      </View>
    );
  }
};

const styles = {
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
  title: {
    margin: 50,
    height: 300
  },
  text: {
    fontSize: 28,
    color: '#fff',
    padding: 40
  },
  list: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  item1: {
    height: 110,
    backgroundColor: '#909090',
    marginBottom: 3
  },
  item2: {
    height: 110,
    backgroundColor: '#e0e0e0',
    marginBottom: 3
  },
  loading: {
    padding: 50,
    textAlign: 'center',
  }
};

render(<App />, document.body, { driver: DU });
