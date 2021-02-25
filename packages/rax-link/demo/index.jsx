import {createElement, render} from 'rax';
import DU from 'driver-universal';
import Link from '../src/index';
import Text from 'rax-text';

render(<Link href={"//www.taobao.com"} onPress={(e)=>{console.log(e)}}><Text style={{
  fontSize: 14,
  color: '#333333'
}}>click to jump</Text></Link>, document.body, { driver: DU });
