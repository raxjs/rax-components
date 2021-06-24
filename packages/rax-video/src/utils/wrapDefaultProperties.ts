import { ForwardRefExoticComponent } from 'rax';
import { VideoProps } from '../types';


export default function wrapDefaultProperties(Video: ForwardRefExoticComponent<VideoProps>): ForwardRefExoticComponent<VideoProps> {
  Video.displayName = 'Video';
  return Video;
}
