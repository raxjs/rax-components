import {createElement} from 'rax';
import renderer from 'rax-test-renderer';
import Video from '../../lib/index';

jest.mock('universal-env', () => {
  return {
    isWeex: true
  };
});

describe('Video in weex', () => {
  it('render tag Video', () => {
    const component = renderer.create(
      <Video style={{ width: 750, height: 400 }}
        src="https://cloud.video.taobao.com/play/u/2780279213/p/1/e/6/t/1/d/ld/36255062.mp4" />
    );
    let tree = component.toJSON();

    expect(tree.tagName).toEqual('VIDEO');
  });
});
