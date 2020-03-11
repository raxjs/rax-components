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
  }

  resetScroll = () => {
    if (this.waterfall.current) {
      this.setState({
        loadmoreretry: this.loadmoreretry++,
      });
      this.waterfall && this.waterfall.resetLoadmore && this.waterfall.resetLoadmore();
    }
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
      cells.push(<cell key={'waterfall_cell_' + index} {...cellProps}>{renderItem(item, index)}</cell>);
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

    return (<waterfall
      ref={this.waterfall}
      style={{width: 750}}
      {...props}
      onLoadmore={props.onEndReached}
      loadmoreoffset={props.onEndReachedThreshold}
      loadmoreretry={this.state.loadmoreretry}
    >
      {cells}
    </waterfall>);
  }
}

Waterfall.Header = Header;

export default Waterfall;
