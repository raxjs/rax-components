/* eslint-disable import/no-extraneous-dependencies */
import { createElement, Component, render, createRef } from 'rax';
import View from 'rax-view';
import Image from 'rax-image';
import Slider from '../src/index';
import DU from 'driver-universal';
import './index.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.inputRef = createRef();
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        data: [
          '//gw.alicdn.com/tfs/TB19NbqKFXXXXXLXVXXXXXXXXXX-750-500.png',
          '//gw.alicdn.com/tfs/TB1tWYBKFXXXXatXpXXXXXXXXXX-750-500.png',
          '//gw.alicdn.com/tfs/TB1SX_vKFXXXXbyXFXXXXXXXXXX-750-500.png'
        ]
      });
    }, 1000);
    // setTimeout(() => {
    //   this.setState({
    //     data: []
    //   });
    // }, 2000);
  }

  onchange = (e) => {
    console.log('change', e);
  }

  onClick = () => {
    this.inputRef.current.slideTo(0);
  }

  render() {
    return (
      <View>
        <Slider
          className="slider"
          width={750}
          height={500}
          autoPlay={false}
          index={2}
          loop={true}
          showsPagination={true}
          paginationStyle={{
            position: 'absolute',
            width: '750rpx',
            height: '40rpx',
            bottom: '20rpx',
            left: 0,
            itemColor: 'rgba(255, 255, 255, 0.5)',
            itemSelectedColor: 'rgb(255, 80, 0)',
            itemSize: '16rpx'
          }}
          autoplayTimeout={3000}
          onChange={this.onchange}
          ref={this.inputRef}
        >
          {this.state.data.map((item) => (
            <View key={item} className="itemWrap">
              <Image className="image" source={{ uri: item }} />
            </View>))}
        </Slider>
        <View onClick={this.onClick}>Click</View>
      </View>
    );
  }
}

render(<App />, document.body, { driver: DU });
