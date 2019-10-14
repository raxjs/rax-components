import * as Rax from 'rax';

export interface BindingProps {
  element: any;
  property: string;
  expression: string;
  config?: {
    [key: string]: any;
  };
}

export interface ParallaxRange<T = number> {
  type?: 'translate' | 'scale' | 'rotate';
  in: [number, number];
  out: T[];
}

export interface ParallaxProps extends Rax.RefAttributes<HTMLDivElement>, Rax.HTMLAttributes<HTMLDivElement> {
  bindingScroller: Rax.RefObject<any>;
  bindingProps: BindingProps[];
  transform: ParallaxRange[];
  backgroundColor: ParallaxRange<string>;
  opacity: ParallaxRange;
  extraBindingProps: BindingProps[];
}
