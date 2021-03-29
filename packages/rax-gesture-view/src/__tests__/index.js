import {createElement, Component} from 'rax';
import renderer from 'rax-test-renderer';
import View from '../../lib';

describe('View', () => {
  it('test typeof View', () => {
    expect(typeof View).toEqual('function');
  });
});
