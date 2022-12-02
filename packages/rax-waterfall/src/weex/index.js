import {PureComponent, Component, createElement, createRef} from 'rax';
import RefreshControl from 'rax-refreshcontrol';
import cloneElement from 'rax-clone-element';

class Header extends PureComponent {
  render() {
    return <header {...this.props} append="tree" />;
  }
}

class Waterfall extends Component {
  loadmoreretry = 1;

  constructor(props) {
    super(props);
    this.state = {
      loadmoreretry: 0,
    };
    this.waterfall = createRef();
    this.topRef = createRef();
  }

  resetScroll = () => {
    if (this.waterfall.current) {
      this.setState({
        loadmoreretry: this.loadmoreretry++, // for weex 0.9-
      });
      this.waterfall.current.resetLoadmore && this.waterfall.current.resetLoadmore(); // for weex 0.9+.
    }
  }

  scrollTo(options) {
    const { x = 0, y = 0, animated = true } = options || {};

    const dom = __weex_require__('@weex-module/dom');
    const contentContainer = this.topRef.current;

    contentContainer &&
      dom.scrollToElement(contentContainer, {
        offset: x || y || 0,
        animated
      });
  }

  render() {
    let props = this.props;
    let {
      renderHeader,
      renderFooter,
      dataSource,
      cellProps = {},
      renderItem = () => {}
    } = props;

    let header = typeof renderHeader == 'function' ? renderHeader() : null;
    let footer = typeof renderFooter == 'function' ? renderFooter() : null;
    header = Array.isArray(header) ? header : [header];
    footer = Array.isArray(footer) ? footer : [footer];

    let cells = header.map((child, index) => {
      if (child) {
        if (child.type != RefreshControl && child.type != Header) {
          return <Header key={'waterfall_header_' + index}>{child}</Header>;
        } else {
          return cloneElement(child, {});
        }
      }
    });

    dataSource && dataSource.forEach((item, index) => {
      if (index === 0) {
        cells.push(<cell key={'waterfall_cell_' + index} ref={this.topRef} {...cellProps} >{renderItem(item, index)}</cell>);
      } else {
        cells.push(<cell key={'waterfall_cell_' + index} {...cellProps} >{renderItem(item, index)}</cell>);
      }
    });

    cells = cells.concat(footer.map((child, index) => {
      if (child) {
        if (child.type != Header) {
          return <Header key={'waterfall_footer_' + index}>{child}</Header>;
        } else {
          return cloneElement(child, {});
        }
      }
    }));

    const { onEndReachedThreshold, ...rest } = props;

    return (<waterfall
      ref={this.waterfall}
      style={{width: 750}}
      {...rest}
      onLoadmore={props.onEndReached}
      loadmoreoffset={onEndReachedThreshold}
      loadmoreretry={this.state.loadmoreretry}
    >
      {cells}
    </waterfall>);
  }
}

Waterfall.Header = Header;

export default Waterfall;
