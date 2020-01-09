import {createElement, Component} from 'rax';
import renderer from 'rax-test-renderer';
import Icon, { createIconSet } from '../../lib/index';

describe('Icon', () => {
  it('render tag Icon', () => {
    const icon = 'https://gw.alicdn.com/tfs/TB1KRRuQXXXXXbwapXXXXXXXXXX-200-200.png';
    const component = renderer.create(
      <Icon style={{width: 20, height: 20}} source={{uri: icon}}/>
    );
    let tree = component.toJSON();
    expect(tree.style.width).toEqual(20);
    expect(tree.style.height).toEqual(20);
    expect(tree.tagName).toEqual('IMG');
  });

  it('use fontFamily in Icon', () => {
    const component = renderer.create(
      <Icon fontFamily="iconfont" source={{
      uri: 'https://at.alicdn.com/t/font_pkm0oq8is8fo5hfr.ttf',
      codePoint: '\uE60f'}}/>
    );
    let tree = component.toJSON();
    expect(tree.style.fontFamily).toEqual('iconfont');
    expect(tree.tagName).toEqual('SPAN');
  });

  it('use createIconSet and codePoint in Icon', () => {
    const IconFont = createIconSet({}, 'iconfont', 'https://at.alicdn.com/t/font_pkm0oq8is8fo5hfr.ttf');
    const component = renderer.create(
      <IconFont codePoint={'\uE60f'}/>
    );
    let tree = component.toJSON();
    expect(tree.tagName).toEqual('SPAN');
  });

  it('use createIconSet and name in Icon', () => {
    const IconFont = createIconSet({
      hello: '\uE60f'
    }, 'iconfont', 'https://at.alicdn.com/t/font_pkm0oq8is8fo5hfr.ttf');
    const component = renderer.create(
      <IconFont codePoint={'\uE60f'}/>
    );
    let tree = component.toJSON();
    expect(tree.tagName).toEqual('SPAN');
  });
});
