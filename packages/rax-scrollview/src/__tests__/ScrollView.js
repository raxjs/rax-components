import { createElement, Component, createRef } from 'rax';
import renderer from 'rax-test-renderer';
import ScrollView from '../../lib/index';

describe('ScrollView', () => {
  it('should render a ScrollView', () => {
    class ScrollViewTest extends Component {
      renderBody() {
        return [1, 2, 3].map((num, index) => {
          return <span key={index}>{num}</span>;
        });
      }
      componentDidMount() {
        this.refs.scrollview.scrollTo({
          x: 0,
          y: 0
        });
      }
      render() {
        const props = {
          ref: 'scrollview',
          children: [].concat(this.renderBody())
        };
        return <ScrollView {...props} />;
      }
    }

    const component = renderer.create(
      <ScrollViewTest />
    );

    const tree = component.toJSON();
    expect(tree.tagName).toEqual('DIV');
    expect(tree.children[0].children[0].children[0]).toEqual('1');
    expect(tree.children[0].children[1].children[0]).toEqual('2');
    expect(tree.children[0].children[2].children[0]).toEqual('3');
  });

  it('use child in ScrollView', () => {
    class ScrollViewChildTest extends Component {
      render() {
        const props = {
          children: [<span key={1}>1</span>, null, <span key={3}>3</span>]
        };
        return <ScrollView {...props} />;
      }
    }

    const component = renderer.create(
      <ScrollViewChildTest />
    );

    const tree = component.toJSON();
    expect(tree.tagName).toEqual('DIV');
    expect(tree.children[0].children.length).toEqual(2);
    expect(tree.children[0].children[0].children[0]).toEqual('1');
    expect(tree.children[0].children[1].children[0]).toEqual('3');
  });

  it('use props on Scrollview', () => {
    class ScrollViewPropsTest extends Component {
      render() {
        const props = {
          children: [<span key={1}>1</span>]
        };
        return (
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            onEndReachedThreshold={300}
            onEndReached={() => {}}
            onScroll={() => {}}
            onTouchStart={() => {}}
            {...props}
          />
        );
      }
    }

    const component = renderer.create(
      <ScrollViewPropsTest />
    );

    const tree = component.toJSON();
    expect(tree.style.WebkitOverflowScrolling).toEqual('touch');
    expect(tree.style.overflow).toEqual('scroll');
    expect(tree.attributes.horizontal).toEqual(true);
    expect(tree.attributes.showsHorizontalScrollIndicator).toEqual(false);
    expect(tree.attributes.onEndReachedThreshold).toEqual(undefined);
    expect(typeof tree.eventListeners.endreached).toEqual('function');
    expect(typeof tree.eventListeners.scroll).toEqual('function');
    expect(typeof tree.eventListeners.touchstart).toEqual('function');
  });

  it('use methods in Scrollview', () => {
    let listRef = createRef(null);
    const component = renderer.create(
      <ScrollView ref={listRef} />
    );

    expect(typeof listRef.current.resetScroll).toEqual('function');
    expect(typeof listRef.current.scrollTo).toEqual('function');
    expect(typeof listRef.current.scrollIntoView).toEqual('function');
  });
});