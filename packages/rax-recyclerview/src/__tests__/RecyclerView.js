import {createElement, Component} from 'rax';
import renderer from 'rax-test-renderer';
import RecyclerView from '../../lib/index';

class RecyclerViewTest extends Component {
  renderHeader() {
    return <span key={'header'}>header</span>;
  }
  renderFooter() {
    return <span key={'footer'}>footer</span>;
  }
  renderBody() {
    return [1, 2, 3].map((num, index) => {
      return <span key={index}>{num}</span>;
    });
  }
  render() {
    let props = {
      ref: 'recycleview',
      children: [].concat(this.renderHeader(), this.renderBody(), this.renderFooter()),
    };
    return <RecyclerView {...props} />;
  }
}

describe('RecyclerView', () => {
  it('should render a RecyclerView', () => {
    let component = renderer.create(
      <RecyclerViewTest />
    );

    let tree = component.toJSON();
    expect(tree.tagName).toEqual('DIV');
    expect(tree.children[0].children[0].children[0]).toEqual('header');
    expect(tree.children[0].children[1].children[0]).toEqual('1');
    expect(tree.children[0].children[2].children[0]).toEqual('2');
    expect(tree.children[0].children[3].children[0]).toEqual('3');
    expect(tree.children[0].children[4].children[0]).toEqual('footer');
  });
});
