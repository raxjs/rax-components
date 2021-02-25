import {createElement, Component, render} from 'rax';
import renderer from 'rax-test-renderer';
import Image from '../../lib/';

describe('Image', () => {
  beforeEach(function() {
    jest.useFakeTimers();
  });

  function createNodeElement(tagName) {
    return {
      nodeType: 1,
      tagName: tagName.toUpperCase(),
      attributes: {},
      style: {},
      childNodes: [],
      parentNode: null
    };
  }

  it('should render empty img tag when no source or source.uri', () => {
    const component = renderer.create(
      <Image />
    );
    let tree = component.toJSON();
    expect(tree.tagName).toEqual('IMG');
    expect(tree.attributes).toEqual(undefined);
  });

  it('should render a image', () => {
    const component = renderer.create(
      <Image source={{uri: 'a.png'}} style={{
        width: '20rem',
        height: '20rem'
      }} />
    );

    let tree = component.toJSON();
    expect(tree.tagName).toEqual('IMG');
    expect(tree.attributes.src).toEqual('a.png');
  });

  it('should render a image with resizeMode', () => {
    const component = renderer.create(
      <Image source={{uri: 'a.png'}} style={{
        width: '20rem',
        height: '20rem'
      }} resizeMode="cover" />
    );

    let tree = component.toJSON();
    expect(tree.style.objectFit).toEqual('cover');
  });

  it('should call onLoad when callback with success:true', () => {
    let container = createNodeElement('div');

    let isLoad = false;

    const onLoad = () => {
      isLoad = true;
    };

    render(<Image source={{uri: 'a.png'}} style={{
      width: '20rem',
      height: '20rem'
    }} onLoad={onLoad} />, container);

    expect(container.childNodes[0].tagName).toEqual('IMG');
    container.childNodes[0].eventListeners.load({
      success: true
    });
    expect(isLoad).toEqual(true);
  });

  it('should call onError when callback with success:false', () => {
    let container = createNodeElement('div');

    let isError = false;

    const onError = () => {
      isError = true;
    };

    render(<Image source={{uri: 'a.png'}} style={{
      width: '20rem',
      height: '20rem'
    }} onError={onError} />, container);

    expect(container.childNodes[0].tagName).toEqual('IMG');
    container.childNodes[0].eventListeners.load({
      success: false
    });
    expect(isError).toEqual(true);
  });

  it('should call onLoad when callback with currentTarget info', () => {
    let container = createNodeElement('div');

    let isLoad = false;

    const onLoad = () => {
      isLoad = true;
    };

    render(<Image source={{uri: 'a.png'}} style={{
      width: '20rem',
      height: '20rem'
    }} onLoad={onLoad} />, container);

    expect(container.childNodes[0].tagName).toEqual('IMG');
    container.childNodes[0].eventListeners.load({
      currentTarget: {
        naturalWidth: 20,
        naturalHeight: 20
      }
    });
    expect(isLoad).toEqual(true);
  });

  it('should call onError when callback with error currentTarget info', () => {
    let container = createNodeElement('div');

    let isError = false;

    const onError = () => {
      isError = true;
    };

    render(<Image source={{uri: 'a.png'}} style={{
      width: '20rem',
      height: '20rem'
    }} onError={onError} />, container);

    expect(container.childNodes[0].tagName).toEqual('IMG');
    container.childNodes[0].eventListeners.load({
      currentTarget: {
        naturalWidth: 0,
        naturalHeight: 0
      }
    });
    expect(isError).toEqual(true);
  });

  it('should call onError when image load error', () => {
    let container = createNodeElement('div');

    let isError = false;

    const onError = () => {
      isError = true;
    };

    render(<Image source={{uri: 'a.png'}} style={{
      width: '20rem',
      height: '20rem'
    }} onError={onError} />, container);

    expect(container.childNodes[0].tagName).toEqual('IMG');
    container.childNodes[0].eventListeners.error();
    expect(isError).toEqual(true);
  });
});
