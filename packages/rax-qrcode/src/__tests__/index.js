import {createElement, Component} from 'rax';
import renderer from 'rax-test-renderer';
import QrCode from '../';

describe('QrCode', () => {
  it('test typeof QrCode', () => {
    expect(typeof QrCode).toEqual('function');
  });
});
