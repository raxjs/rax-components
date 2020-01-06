import { createElement, Component } from 'rax';
import renderer from 'rax-test-renderer';
import ScrollView from '../../lib/index';

jest.mock('universal-env', () => {
  return {
    isWeex: true
  };
});

describe('ScrollView', () => {
  it('should render a ScrollView', () => {
    class ScrollViewTest extends Component {
      render() {
        return <ScrollView>hello</ScrollView>;
      }
    }

    const component = renderer.create(
      <ScrollViewTest />
    );
    let tree = component.toJSON();
    expect(tree.tagName).toEqual('scroller');
  });
});