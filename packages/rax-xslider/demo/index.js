/** @jsx createElement */
import {createElement, render, useRef, useState} from 'rax';
import View from 'rax-view';
import Text from 'rax-text';
import DU from 'driver-universal';
import Slider from '../src/index';
import ScrollView from 'rax-scrollview';
import animate from 'universal-animation';
import findDOMNode from 'rax-find-dom-node';
import {isWeb} from 'universal-env';

if (isWeb) {
  document.body.style.margin = 0;
}

const styles = {
  item: {
    height: 400,
    justifyContent: 'center',
    borderRadius: 24,
    borderWidth: 5,
    borderColor: '#000',
    borderStyle: 'solid'
  },
  panView: {
    height: 400,
    justifyContent: 'center'
  },
  txt: {
    color: '#fff',
    fontSize: 50,
    textAlign: 'center'
  },
  title: {
    backgroundColor: '#f7f7f7',
    color: '#444',
    textAlign: 'center',
    fontSize: 28,
    lineHeight: 80
  }
};

const colors = [
  'red',
  'green',
  'blue',
  'orange',
  'yellow'
];

const App = () => {
  const pagination = useRef(null); 
  const [loadMore, setLoadMore] = useState(false);
  const bgList = Array.apply(null, {length: colors.length}).map(() => useRef(null));
  const getCardTransitionSpec = () => {
    return {
      props: [
        {
          property: 'transform.scale',
          inputRange: [0, 1],
          outputRange: [0.8, 1]
        },
        {
          property: 'opacity',
          inputRange: [0, 1],
          outputRange: [.2, 1]
        }
      ]
    };
  }
  return (<ScrollView style={{flex: 1, overflow: 'hidden'}}>
    <View>
      <Text style={styles.title}>Default</Text>
    </View>
    <View>
      <Slider>
        {colors.map((color, i) => {
          return (<Slider.Panel style={{...styles.item, backgroundColor: color}}>
            <Slider.PanView style={styles.panView}><Text style={styles.txt}>{i}</Text></Slider.PanView>
          </Slider.Panel>);
        })}
      </Slider>
    </View>

    <View>
      <Text style={styles.title}>Loop & autoPlay</Text>
    </View>
    <View>
    <Slider
      loop={true}
      autoPlay={true}
    >
      {colors.map((color, i) => {
        return (<Slider.Panel style={{...styles.item, backgroundColor: color}}>
          <Slider.PanView style={styles.panView}><Text style={styles.txt}>{i}</Text></Slider.PanView>
        </Slider.Panel>);
      })}
    </Slider>
    </View>

    <View>
      <Text style={styles.title}>StartGap and EndGap</Text>
    </View>
    <View>
    <Slider
      loop={true}
      autoPlay={true}
      startGap={75}
      endGap={75}
      cardSize={600}
    >
      {colors.map((color, i) => {
        return (<Slider.Panel style={{...styles.item, backgroundColor: color}}>
          <Slider.PanView style={styles.panView}><Text style={styles.txt}>{i}</Text></Slider.PanView>
        </Slider.Panel>);
      })}
    </Slider>
    </View>

    <View>
      <Text style={styles.title}>cardTransition</Text>
    </View>
    <View>
    <Slider
      loop={true}
      autoPlay={true}
      startGap={75}
      endGap={75}
      cardSize={600}
      cardTransitionSpec={getCardTransitionSpec}
    >
      {colors.map((color, i) => {
        return (<Slider.Panel style={{...styles.item, backgroundColor: color}}>
          <Slider.PanView style={styles.panView}><Text style={styles.txt}>{i}</Text></Slider.PanView>
        </Slider.Panel>);
      })}
    </Slider>
    </View>

    <View>
      <Text style={styles.title}>Vertical</Text>
    </View>
    <View>
    <Slider
      vertical={true}
      loop={true}
      autoPlay={true}
      startGap={75}
      endGap={75}
      cardSize={200}
      cardTransitionSpec={getCardTransitionSpec}
    >
      {colors.map((color, i) => {
        return (<Slider.Panel style={{...styles.item, backgroundColor: color}}>
          <Slider.PanView style={styles.panView}><Text style={styles.txt}>{i}</Text></Slider.PanView>
        </Slider.Panel>);
      })}
    </Slider>
    </View>

    <View>
      <Text style={styles.title}>viewportSize</Text>
    </View>
    <View>
    <Slider
      loop={true}
      autoPlay={true}
      startGap={300}
      endGap={300}
      cardSize={150}
      viewportSize={750}
      cardTransitionSpec={getCardTransitionSpec}
    >
      {colors.map((color, i) => {
        return (<Slider.Panel style={{...styles.item, backgroundColor: color}}>
          <Slider.PanView style={styles.panView}><Text style={styles.txt}>{i}</Text></Slider.PanView>
        </Slider.Panel>);
      })}
    </Slider>
    </View>


    <View>
      <Text style={styles.title}>Indicator config</Text>
    </View>
    <View>
      <Slider
        indicatorStyle={{
          backgroundColor: 'rgba(0,0,0,.1)',
          padding: 10,
          top: 0,
          bottom: undefined
        }}
        indicatorItemStyle={{
          backgroundColor: '#fff'
        }}
        indicatorActiveItemStyle={{
          backgroundColor: 'blue'
        }}
        // 自定义indicator
        // indicatorComponent={null}
      >
        {colors.map((color, i) => {
          return (<Slider.Panel style={{...styles.item, backgroundColor: color}}>
            <Slider.PanView style={styles.panView}><Text style={styles.txt}>{i}</Text></Slider.PanView>
          </Slider.Panel>);
        })}
      </Slider>
    </View>

    <View>
      <Text style={styles.title}>extraBindingProps</Text>
    </View>
    <View>
    <View style={{position: 'relative', alignItems: 'center', overflow: 'hidden'}}>
      <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}}>
        {colors.map((color, i) => {
          return (<View key={i}
            ref={bgList[i]}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 1000,
              backgroundColor: color,
              opacity: i === 0 ? 1 : 0
            }} />);
        })}
        <View
          style={{position: 'absolute', top: 0, left: 0, right: 0, height: 1000, backgroundColor: 'rgba(0,0,0,.5)'}} />
      </View>
      <Slider
        loop={true}
        autoPlay={true}
        startGap={75}
        endGap={75}
        cardSize={600}
        cardTransitionSpec={getCardTransitionSpec}
        beforeSwitch={(e) => {
          if (pagination.current) {
            let lineHeight = 40;
            let bgProps = [];

            colors.forEach((color, i) => {
              bgProps.push({
                element: findDOMNode(bgList[i].current),
                property: 'opacity',
                end: i === e.index ? 1 : 0,  // current background opacity is set to 1 and others are set to 0
                duration: e.duration,
                easing: e.easing
              });
            });

                  // trigger the pagination animate
            animate({
              props: [
                {
                  element: findDOMNode(pagination.current),
                  property: 'transform.translateY',
                  end: -e.index * lineHeight,
                  duration: e.duration,
                  easing: e.easing
                },
                ...bgProps
              ]
            }, () => {

            });
          }

        }}
        extraBindingProps={({index}) => {
          let cardSize = 600;
          let lineHeight = 40;
          let pageNum = colors.length;

          let bgProps = [];

          colors.forEach((color, i) => {

            let expression = '0+0';

            if (i === index) {
              expression = `1-abs(x)/${cardSize}`;
            }
                  // prev
            if (i === (index - 1 + pageNum) % pageNum) {
              expression = `x>0 ? abs(x)/${cardSize} : 0`;
            }
                  // next
            if (i === (index + 1 + pageNum) % pageNum) {
              expression = `x<0 ? abs(x)/${cardSize} : 0`;
            }


            bgProps.push({
              element: bgList[i].current,
              property: 'opacity',
              expression: expression
            });
          });

          let props = [{
            element: pagination.current,
            property: 'transform.translateY',
            expression: `min(0,max(-${pageNum * 40},0-${lineHeight * index}+x/${cardSize}*${lineHeight}))`
          }, ...bgProps];
          return props;
        }}
      >
        {colors.map((color, i) => {
          return (<Slider.Panel key={i} style={{...styles.item, backgroundColor: color}}>
            <Slider.PanView style={styles.panView}> <Text style={styles.txt}>{i}</Text></Slider.PanView>
          </Slider.Panel>);
        })}
      </Slider>
      <View style={{
        justifyContent: 'center',
        flexDirection: 'row',
        height: 40,
        overflow: 'hidden',
        width: 100,
        borderRadius: 100,
        backgroundColor: 'rgba(0,0,0,.5)',
        position: 'relative'
      }}>
        <View style={{}} ref={pagination}>
          {colors.map((color, i) => {
            return (<Text
              style={{height: 40, lineHeight: 40, textAlign: 'center', fontSize: 24, color: '#fff'}}>{i + 1}</Text>);
          })}
        </View>
        <Text style={{
          height: 40,
          lineHeight: 40,
          textAlign: 'center',
          fontSize: 24,
          color: '#fff'
        }}>/{colors.length}</Text>
      </View>
    </View>
    </View>

    <View>
      <Text style={styles.title}>loadMore Offset</Text>
    </View>
    <View>
      <Slider
        minLoadMoreOffset={100}
        cardSize={750}
      >
        {colors.map((color, i) => {
          return (<Slider.Panel style={{...styles.item, backgroundColor: color}}>
            <Slider.PanView style={styles.panView}><Text style={styles.txt}>{i}</Text></Slider.PanView>
          </Slider.Panel>);
        })}
        <Slider.LoadMore
          onLoading={() => {
            setLoadMore(true);
          }}
          style={{
            ...styles.item,
            backgroundColor: '#f00',
            width: 800,
            height: 500,
          }}
        >
          <Slider.PanView style={styles.panView}><Text style={styles.title}>{!loadMore ? 'load more...' : 'load finish'}</Text></Slider.PanView>
        </Slider.LoadMore>
      </Slider>
    </View>
  </ScrollView>);
} 

render(<App />, document.body, { driver: DU });
