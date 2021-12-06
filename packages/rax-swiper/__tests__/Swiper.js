import { createElement } from 'rax';
import renderer from 'rax-test-renderer';
import { Swiper, SwiperSlide } from '../lib/index';

describe('Swiper in web', () => {
  let component;
  beforeAll(() => {
    component = renderer.create(
      <Swiper>
        <SwiperSlide key="1">Slide 1</SwiperSlide>
        <SwiperSlide key="2">Slide 2</SwiperSlide>
        <SwiperSlide key="3">Slide 3</SwiperSlide>
        <SwiperSlide key="4">Slide 4</SwiperSlide>
        <SwiperSlide key="5">Slide 5</SwiperSlide>
      </Swiper>
    );
  });

  it('render correctly', () => {
    let tree = component.toJSON();
    expect(tree.tagName).toEqual('DIV');
    expect(tree.attributes.class).toContain('swiper-container');
    expect(tree.children[0].children[0].children[0]).toEqual('Slide 1');
    expect(tree.children[0].children[1].children[0]).toEqual('Slide 2');
    expect(tree.children[0].children[2].children[0]).toEqual('Slide 3');
    expect(tree.children[0].children[3].children[0]).toEqual('Slide 4');
    expect(tree.children[0].children[4].children[0]).toEqual('Slide 5');
  });
});
