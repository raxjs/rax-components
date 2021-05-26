import {createElement} from 'rax';
import renderer from 'rax-test-renderer';
import Link from '../../lib/';

jest.mock('universal-env', () => {
  return {
    isWeex: true
  };
});

// Could not mock universal-env in rax-text current,
// because universal-env is not peer ependencies
jest.mock('rax-text', () => {
  return function(props) {
    return <text value={props.children} />;
  };
});


describe('Link', () => {
  it('should render a link', () => {
    const component = renderer.create(
      <Link>Example</Link>
    );
    let tree = component.toJSON();
    expect(tree.tagName).toEqual('A');
    expect(tree.children[0].attributes.value).toEqual('Example');
  });

  it('should turn onPress to onClick', () => {
    const mockPress = jest.fn();
    const component = renderer.create(
      <Link onPress={mockPress}>Example</Link>
    );
    let tree = component.toJSON();
    expect(tree.eventListeners.click).toBe(mockPress);
  });

  it('should display the font size according to the props', () => {
    const component = renderer.create(
      <Link style={{fontSize: '100rem'}}>
        Some link text
      </Link>
    );

    let tree = component.toJSON();
    expect(tree.style.fontSize).toBe('100rem');
  });
});
