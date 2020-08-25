import { Fragment } from 'rax';
import Children from 'rax-children';

function getChildren(children) {
  const slides = [];

  const slots = {
    'container-start': [],
    'container-end': [],
    'wrapper-start': [],
    'wrapper-end': [],
  };
  function processChildren(c) {
    Children.toArray(c).forEach((child) => {
      if (child.type === Fragment && child.props.children) {
        processChildren(child.props.children);
        return;
      }
      if (child.type && child.type.displayName === 'SwiperSlide') {
        slides.push(child);
      } else if (child.props && child.props.slot && slots[child.props.slot]) {
        slots[child.props.slot].push(child);
      } else {
        slots['container-end'].push(child);
      }
    });
  }
  processChildren(children);
  return { slides, slots };
}

export { getChildren };
