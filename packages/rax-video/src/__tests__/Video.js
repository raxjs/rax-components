global.callNative = null;
import {createElement} from 'rax';
import renderer from 'rax-test-renderer';
import Video from '../../lib/index';

describe('Video', () => {
  it('render tag Video', () => {
    const component = renderer.create(
      <Video style={{ width: 750, height: 400 }}
        src="https://cloud.video.taobao.com/play/u/2780279213/p/1/e/6/t/1/d/ld/36255062.mp4" />
    );
    let tree = component.toJSON();
    expect(tree.tagName).toEqual('VIDEO');
  });

  it('use default props on Video', () => {
    const mockPress = jest.fn();
    const component = renderer.create(
      <Video style={{ width: 750, height: 400 }}
        src="https://cloud.video.taobao.com/play/u/2780279213/p/1/e/6/t/1/d/ld/36255062.mp4" />
    );
    let tree = component.toJSON();
    expect(tree.attributes.controls).toBe(true);
    expect(tree.attributes['webkit-playsinline']).toBe(true);
  });

  it('use auto props on Video', () => {
    const mockPress = jest.fn();
    const component = renderer.create(
      <Video autoPlay={true} style={{ width: 750, height: 400 }}
        src="https://cloud.video.taobao.com/play/u/2780279213/p/1/e/6/t/1/d/ld/36255062.mp4" />
    );
    let tree = component.toJSON();
    expect(tree.attributes.autoPlay).toBe(true);
  });
});
