import {PureComponent, Component, createElement, createRef} from 'rax';
import View from 'rax-view';
import ScrollView from 'rax-scrollview';
import RefreshControl from 'rax-refreshcontrol';
import cloneElement from 'rax-clone-element';
import omit from 'omit.js';
class Header extends PureComponent {
  render() {
    return <View {...this.props} />;
  }
}

class WebFall extends PureComponent {
  calcHeightSum = (arr) => {
    let sum = 0;
    arr && arr.forEach(item => {
      sum += item;
    });
    return sum;
  };

  render() {
    const {renderItem = () => {}, dataSource, columnCount = 1, leftGap = 0, rightGap = 0} = this.props;
    let columns = [];
    let moduleHeights = [];

    for (let i = 0; i < columnCount; i++) {
      columns[i] = [];
      moduleHeights[i] = 0;
    }

    dataSource && dataSource.forEach((item, i) => {
      let targetColumnIndex = 0;
      let minHeight = moduleHeights[0];

      for (let j = 0; j < columnCount; j++) {
        if (moduleHeights[j] < minHeight) {
          minHeight = moduleHeights[j];
          targetColumnIndex = j;
        }
      }

      moduleHeights[targetColumnIndex] += item.height;
      columns[targetColumnIndex].push(item);
    });

    const wrapStyle = Object.assign({}, styles.waterfallWrap, {
      marginLeft: leftGap + 'rpx',
      marginRight: rightGap + 'rpx'
    });

    return (<View style={wrapStyle}>
      {columns.map((column, index) => {
        return (<View key={'column' + index} style={styles.waterfallColumn}>
          {column.map((item, j) => {
            return renderItem(item, 'c_' + index + j);
          })}
        </View>);
      })}
    </View>);
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
  }

  resetScroll = () => {
    this.scrollview.current && this.scrollview.current.resetScroll();
  }

  scrollTo = (options) => {
    this.scrollview.current && this.scrollview.current.scrollTo(options);
  }

  render() {
    let props = this.props;
    let {
      renderHeader,
      renderFooter,
      columnWidth = 750,
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

    cells = cells.concat(<WebFall key={'waterfall_webfall'} {...props} />);

    cells = cells.concat(footer.map((child, index) => {
      if (child) {
        if (child.type != Header) {
          return <Header key={'waterfall_header_' + index}>{child}</Header>;
        } else {
          return cloneElement(child, {});
        }
      }
    }));

    styles.waterfallColumn.width = columnWidth;
    const omittedProps = omit(props, ['dataSource', 'renderItem', 'renderHeader', 'renderFooter', 'columnWidth', 'columnCount', 'columnGap', 'cellProps', 'leftGap', 'rightGap']);
    return (<ScrollView {...omittedProps} ref={this.scrollview}>
      {cells}
    </ScrollView>);
  }
}

let styles = {
  waterfallWrap: {
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  waterfallColumn: {
  },
};

Waterfall.Header = Header;

export default Waterfall;
