global.callNative = null;
import {createElement} from 'rax';
import renderer from 'rax-test-renderer';
import Text from '../lib/';

describe('Text', () => {
  it('render tag Text', () => {
    const component = renderer.create(
      <Text>Example</Text>
    );
    let tree = component.toJSON();
    expect(tree.tagName).toEqual('SPAN');
    expect(tree.children[0]).toEqual('Example');
  });

  it('use className in Text', () => {
    const component = renderer.create(
      <Text className={'my-text'}>Example</Text>
    );
    let tree = component.toJSON();
    expect(tree.attributes.class).toBe('rax-text-v2 my-text');
  });

  it('use numberOfLines in Text', () => {
    const component = renderer.create(
      <Text numberOfLines={2}>Example</Text>
    );
    let tree = component.toJSON();
    expect(tree.style.WebkitLineClamp).toBe(2);
  });
});
