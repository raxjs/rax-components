import { createElement, useState, useEffect } from 'rax';
import renderer from 'rax-test-renderer';
import Image from '../../lib/';

describe('Image', () => {
  beforeEach(function() {
    jest.useFakeTimers();
  });

  it('should render null when no source or source.uri', () => {
    const component = renderer.create(
      <Image />
    );
    let tree = component.toJSON();
    expect(tree.attributes).toEqual(undefined);
  });

  it('should render a image', () => {
    const component = renderer.create(
      <Image source={{uri: 'a.png'}} style={{
        width: '20rpx',
        height: '20rpx'
      }} />
    );

    let tree = component.toJSON();
    expect(tree.tagName).toEqual('IMG');
    expect(tree.attributes.src).toEqual('a.png');
    expect(tree.style.width).toEqual('20rpx');
    expect(tree.style.height).toEqual('20rpx');
  });

  it('should render a image with resizeMode', () => {
    const component = renderer.create(
      <Image source={{uri: 'a.png'}} style={{
        width: '20rpx',
        height: '20rpx'
      }} resizeMode="cover" />
    );

    let tree = component.toJSON();
    expect(tree.style.objectFit).toEqual('cover');
  });

  it('should render dynamic img uri', () => {
    const App = () => {
      const [uri, setUri] = useState('a.png');
      useEffect(() => {
        setTimeout(() => {
          setUri('b.png');
        }, 1000);
      }, []);
      return <Image source={{ uri }} />;
    };
    const component = renderer.create(<App />);

    let tree = component.toJSON();
    expect(tree.attributes.src).toEqual('a.png');
    jest.runAllTimers();
    expect(tree.attributes.src).toEqual('b.png');
  });
});
