import {Component, createElement, createRef } from 'rax';
import {isWeex, isWeb} from 'universal-env';

let SliderWeb;
if (isWeb) {
  SliderWeb = require('./slider.web');
  if (SliderWeb && SliderWeb.__esModule) {
    SliderWeb = SliderWeb.default;
  }
}

class Slider extends Component {
  constructor(props) {
    super(props);
    this.sliderView = createRef();
  }

  state = {
    index: this.props.index || 0
  }

  static defaultProps = {
    onChange: () => {},
    defaultPaginationStyle: defaultPaginationStyle
  }

  onChange = (e) => {
    this.props.onChange(e);
    this.setState({
      index: e.index
    });
  }

  handleNativeProps() {
    const {
      defaultPaginationStyle,
      autoPlay,
      showsPagination,
      paginationStyle,
      autoPlayInterval,
      loop,
      width,
      height
    } = this.props;

    const {index} = this.state;

    let nativeProps = {
      onChange: this.onChange,
      autoPlay: autoPlay,
      showIndicators: showsPagination,
      paginationStyle: paginationStyle ? paginationStyle : defaultPaginationStyle,
      interval: autoPlayInterval,
      infinite: loop,
      index: index,
      ...{
        style: {
          width: width,
          height: height,
          ...this.props.style
        }
      }
    };

    return nativeProps;
  }

  slideTo(index) {
    if (isWeex) {
      this.setState({
        index: index
      });
    } else {
      this.sliderView.current.slideTo(index);
    }
  }

  render() {
    if (isWeex) {
      const children = this.props.children;
      const nativeProps = this.handleNativeProps();
      return (
        <slider {...nativeProps}>
          {nativeProps.showIndicators ?
            <indicator style={nativeProps.paginationStyle} /> :
            null}
          {children}
        </slider>
      );
    } else {
      return <SliderWeb ref={this.sliderView} {...this.props} />;
    }
  }
}

const defaultPaginationStyle = {
  position: 'absolute',
  width: 750,
  height: 40,
  bottom: 20,
  left: 0,
  itemColor: 'rgba(255, 255, 255, 0.5)',
  itemSelectedColor: 'rgb(255, 80, 0)',
  itemSize: 8
};

export default Slider;
