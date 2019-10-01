global.callNative = null;
import {createElement} from 'rax';
import renderer from 'rax-test-renderer';
import Text from '../../lib/';

describe('Text', () => {
  it('render tag Text', () => {
    const component = renderer.create(
      <Text>Example</Text>
    );
    let tree = component.toJSON();
    expect(tree.tagName).toEqual('SPAN');
    expect(tree.children[0]).toEqual('Example');
  });

  it('style in Text', () => {
    const component = renderer.create(
      <Text>Example</Text>
    );
    let tree = component.toJSON();

    expect(tree.style.whiteSpace).toBe('pre-wrap');
  });
});
