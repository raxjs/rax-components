global.callNative = null;
import {createElement} from 'rax';
import renderer from 'rax-test-renderer';
import TextInput from '../lib';

describe('TextInput', () => {
  it('render tag TextInput', () => {
    const component = renderer.create(
      <TextInput />
    );
    let tree = component.toJSON();
    let input = tree[1];
    expect(input.tagName).toEqual('INPUT');
  });

  it('style in TextInput', () => {
    const component = renderer.create(
      <TextInput
        style={{
          color: '#333'
        }}
      />
    );
    let tree = component.toJSON();
    let input = tree[1];
    expect(input.style.placeholderColor).toBe('#999999');
    expect(input.style.color).toBe('#333');
  });

  it('use className in TextInput', () => {
    const component = renderer.create(
      <TextInput
        className={'my-textinput'}
      />
    );
    let tree = component.toJSON();
    let input = tree[1];
    expect(input.attributes.class).toBe('rax-textinput rax-textinput-placeholder-2 my-textinput');
  });

  it('onInput & onChange', () => {
    const mockFunc = jest.fn();
    const component = renderer.create(
      <TextInput
        onInput={mockFunc}
        onChange={mockFunc}
        onBlur={mockFunc}
        onFocus={mockFunc}
      />
    );
    let tree = component.toJSON();
    let input = tree[1];
    expect(typeof input.eventListeners.input).toBe('function');
    expect(typeof input.eventListeners.change).toBe('function');
    expect(typeof input.eventListeners.blur).toBe('function');
    expect(typeof input.eventListeners.focus).toBe('function');
  });

  it('should render multiline input with value ', () => {
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
    let input = tree[1];
    expect(input.children[0]).toBe('text');
  });
});
