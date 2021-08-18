import { Fragment } from 'rax';
import { SliderType } from '../types';

export default function wrapDefaultProperties(Slider: SliderType): SliderType {
  Slider.displayName = 'Slider';
  Slider.Item = Fragment;
  return Slider;
}
