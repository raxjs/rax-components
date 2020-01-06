global.callNative = null;
import {createElement} from 'rax';
import renderer from 'rax-test-renderer';
import View from '../../lib/';

describe('View', () => {
  it('render tag view', () => {
    const component = renderer.create(
      <View>Example</View>
    );
    let tree = component.toJSON();
    expect(tree.tagName).toEqual('DIV');
    expect(tree.children[0]).toEqual('Example');
  });

  it('turn onPress to onClick', () => {
    const mockPress = jest.fn();
    const component = renderer.create(
      <View onClick={mockPress}>Example</View>
    );
    let tree = component.toJSON();
    expect(tree.eventListeners.click).toBe(mockPress);
  });

  it('className in View', () => {
    const component = renderer.create(
      <View>Example</View>
    );
    let tree = component.toJSON();
    expect(tree.attributes.class).toBe('rax-view');
  });

  it('children in View', () => {
    const component = renderer.create(
      <View>
        <View>Example</View>
      </View>
    );
    let tree = component.toJSON();
    expect(tree.children[0].children[0]).toBe('Example');
  });

  it('special cases in View', () => {
    const component = renderer.create(
      <View>
        <View>{undefined}</View>
        <View>{null}</View>
        <View>{false}</View>
        <View>{[1, 2, 3, null]}</View>
      </View>
    );
    let tree = component.toJSON();
    expect(tree.children[0].children).toBe(undefined);
    expect(tree.children[1].children).toBe(undefined);
    expect(tree.children[2].children).toBe(undefined);
    expect(tree).toMatchSnapshot();
  });
});
