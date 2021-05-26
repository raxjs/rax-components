import { ForwardRefExoticComponent } from 'rax';
import { VideoProps } from '../types';


export default function wrapper(video: ForwardRefExoticComponent<VideoProps>): ForwardRefExoticComponent<VideoProps> {
  video.displayName = 'Video';
  return video;
}
