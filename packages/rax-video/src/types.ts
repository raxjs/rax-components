import { RefAttributes, VideoHTMLAttributes } from 'rax';
/**
 * component:video(视频播放)
 * document address(文档地址):
 * https://alibaba.github.io/rax/component/video
 */
export interface VideoProps extends RefAttributes<HTMLVideoElement>, VideoHTMLAttributes<HTMLVideoElement>{
  /**
   * video playback address
   * (视频播放地址)
   */
  // src: string;
  /**
   * auto play
   * (自动播放)
   */
  autoPlay?: boolean;

  playControl?: 'play' | 'pause';
  poster?: string;
}
