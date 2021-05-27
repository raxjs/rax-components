import {createElement} from 'rax';
import renderer from 'rax-test-renderer';
import TextInput from '../lib';

jest.mock('universal-env', () => {
  return {
    isWeex: true
  };
});

describe('TextInput in weex', () => {
  it('render tag TextInput', () => {
    const component = renderer.create(
      <TextInput />
    );
    let tree = component.toJSON();

    expect(tree.tagName).toEqual('INPUT');
    expect(tree.attributes.disabled).toEqual(false);
  });

  it('should not render multiline input with value ', () => {
    const mockFunc = jest.fn();
    const component = renderer.create(
      <TextInput
        numberOfLines="2"
        placeholder="test"
        value="text"
        multiline
      />
    );
    let tree = component.toJSON();
    expect(tree.children).toBe(undefined);
  });
});
