import { createElement } from 'rax';
import renderer from 'rax-test-renderer';
import View from '../lib';

jest.mock('universal-env', () => {
  return {
    isWeex: true,
  };
});

describe('View in weex', () => {
  it('render tag view', () => {
    const component = renderer.create(<View>Example</View>);

    let tree = component.toJSON();

    expect(tree.tagName).toEqual('DIV');
    expect(tree.children[0]).toEqual('Example');
  });
});
