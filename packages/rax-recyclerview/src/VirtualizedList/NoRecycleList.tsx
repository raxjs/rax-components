/**
 *  backward compatibility： itemSize is optional
 */

import { createElement, forwardRef } from 'rax';
import ScrollView from 'rax-scrollview';

import { VirtualizedList } from './types';

const NoRecycleList: VirtualizedList = forwardRef((props, ref) => {
  const { horizontal, children, ...rest } = props;

  return (
    <ScrollView
      className={`rax-no-recyclerview`}
      ref={ref}
      {...rest}
      horizontal={horizontal}
    >
      {children}
    </ScrollView>
  );
});

export default NoRecycleList;