import {createElement, Component} from 'rax';
import renderer from 'rax-test-renderer';
import Counter from '../';

describe('Counter', () => {
  it('test typeof Counter', () => {
    expect(typeof Counter).toEqual('function');
  });
});
