import {createElement, Component, render} from 'rax';
import renderer from 'rax-test-renderer';
import Countdown from '../';

describe('CountDown', () => {
  beforeEach(function() {
    jest.useFakeTimers();
  });

  afterEach(function() {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it('basic render', () => {
    const tree = renderer.create(
      <Countdown
        timeRemaining={1000}
      />
    );

    expect(tree).toMatchSnapshot();
  });

  it('render with custom style', () => {
    const tree = renderer.create(
      <Countdown
        timeRemaining={100000}
        timeStyle={{
          'color': '#007457',
          'backgroundColor': 'red',
          'marginLeft': '2rpx',
          'marginRight': '2rpx'
        }}
        secondStyle={{'backgroundColor': 'yellow'}}
        textStyle={{'backgroundColor': 'blue'}}
        tpl={'{d}-{h}-{m}-{s}'}
      />
    );

    expect(tree).toMatchSnapshot();
  });

  it('render days bigger than 99', () => {
    const tree = renderer.create(
      <Countdown
        timeRemaining={100000000000}
        tpl={'{d}天{h}时{m}分{s}秒'}
      />
    );

    expect(tree).toMatchSnapshot();
  });

  it('render with onComplete callback', () => {
    const mockCallback = jest.fn();

    const tree = renderer.create(
      <Countdown
        timeRemaining={10}
        tpl={'{d}天{h}时{m}分{s}秒'}
        onComplete={mockCallback}
      />
    );

    jest.runAllTimers();

    expect(mockCallback.mock.calls.length).toBe(1);
  });

  it('render with onTick callback', () => {
    const mockCallback = jest.fn();

    const tree = renderer.create(
      <Countdown
        timeRemaining={10000}
        tpl={'{d}天{h}时{m}分{s}秒'}
        onTick={mockCallback}
      />
    );

    jest.runAllTimers();

    expect(mockCallback.mock.calls.length).toBe(10);
  });

  it('render timeRemaining smaller than 0', () => {
    const tree = renderer.create(
      <Countdown
        timeRemaining={-69}
        tpl={'{m}分{s}秒'}
      />
    );

    expect(tree).toMatchSnapshot();
  });
});
