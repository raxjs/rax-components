import {createElement, Component} from 'rax';
import renderer from 'rax-test-renderer';
import Player from '../';

describe('Player', () => {
  it('test typeof Player', () => {
    expect(typeof Player).toEqual('object');
  });
});
