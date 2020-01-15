import { createElement, useState, useEffect } from 'rax';
import renderer from 'rax-test-renderer';
import Picture from '../../lib/pictureWeb';

jest.mock('universal-env', () => {
  return {
    isWeb: true
  };
});

describe('Picture', () => {
  beforeEach(function() {
    jest.useFakeTimers();
  });

  it('should render null when no source or source.uri', () => {
    const component = renderer.create(
      <Picture />
    );
    let tree = component.toJSON();
    expect(tree).toEqual(null);
  });

  it('should render a image', () => {
    const component = renderer.create(
      <Picture source={{uri: 'a.png'}} style={{
        width: '20rpx',
        height: '20rpx'
      }} />
    );

    let tree = component.toJSON();
    expect(tree.tagName).toEqual('IMG');
    expect(tree.attributes.src).toEqual('a.png');
  });

  it('should render a image with resizeMode', () => {
    const component = renderer.create(
      <Picture source={{uri: 'a.png'}} style={{
        width: '20rpx',
        height: '20rpx'
      }} resizeMode="cover" />
    );

    let tree = component.toJSON();
    expect(tree.style.objectFit).toEqual('cover');
  });

  it('should render dynamic picture uri', () => {
    const App = () => {
      const [uri, setUri] = useState('a.png');
      useEffect(() => {
        setTimeout(() => {
          setUri('b.png');
        }, 1000);
      }, []);
      return <Picture source={{ uri }} />;
    };
    const component = renderer.create(<App />);

    let tree = component.toJSON();
    expect(tree.attributes.src).toEqual('a.png');
    jest.runAllTimers();
    expect(tree.attributes.src).toEqual('b.png');
  });
});
