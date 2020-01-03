import {PureComponent, Component, createElement, createRef} from 'rax';
import {isWeex} from 'universal-env';
import View from 'rax-view';
import ScrollView from 'rax-scrollview';
import RefreshControl from 'rax-refreshcontrol';
import cloneElement from 'rax-clone-element';

class Header extends PureComponent {
  render() {
    if (isWeex) {
      return <header {...this.props} append="tree" />;
    } else {
      return <View {...this.props} />;
    }
  }
}

class Waterfall extends Component {
  loadmoreretry = 1;

  constructor(props) {
    super(props);
    this.state = {
      loadmoreretry: 0,
    };
    this.scrollview = createRef();
    this.waterfall = createRef();
  }

  resetScroll = () => {
    if (isWeex && this.waterfall.current) {
      this.setState({
        loadmoreretry: this.loadmoreretry++, // Change the value every time you turn the page, for weex 0.9-.
      });
      this.waterfall.current.resetLoadmore && this.waterfall.current.resetLoadmore(); // Using the resetLoadmore method to update the loaded place, for weex 0.9+.
    } else {
      this.scrollview.current && this.scrollview.current.resetScroll();
    }
  }

  render() {
    let props = this.props;
    let {
      renderHeader,
      renderFooter,
      columnWidth = 750,
      columnCount = 1,
      columnGap = 0,
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

    if (isWeex) {
      dataSource && dataSource.forEach((item, index) => {
        cells.push(<cell key={'waterfall_cell_' + index} {...cellProps}>{renderItem(item, index)}</cell>);
      });
    } else {
      let WebWaterfall = require('./waterfall.web').default;
      console.log(WebWaterfall);
      cells = cells.concat(<WebWaterfall key={'waterfall_webfall'} {...props} />);
    }

    cells = cells.concat(footer.map((child, index) => {
      if (child) {
        if (child.type != Header) {
          return <Header key={'waterfall_footer_' + index}>{child}</Header>;
        } else {
          return cloneElement(child, {});
        }
      }
    }));

    if (isWeex) {
      return (<waterfall
        style={{width: 750}}
        ref={this.waterfall}
        {...props}
        onLoadmore={props.onEndReached}
        loadmoreoffset={props.onEndReachedThreshold}
        loadmoreretry={this.state.loadmoreretry}
      >
        {cells}
      </waterfall>);
    } else {
      return (<ScrollView {...props} ref={this.scrollview}>
        {cells}
      </ScrollView>);
    }
  }
}

Waterfall.Header = Header;

export default Waterfall;
