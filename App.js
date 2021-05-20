import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Animated,
  TouchableWithoutFeedback,
  Dimensions,
  PanResponder,
  Image,
  Text
} from 'react-native';

import Vjeux from './vjeux.jpg';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      heads: [
        {
          image: Vjeux,
          animation: new Animated.ValueXY(),
          text: 'Drag Me',
        },
        {
          image: Vjeux,
          animation: new Animated.ValueXY(),
        },
        {
          image: Vjeux,
          animation: new Animated.ValueXY(),
        },
        {
          image: Vjeux,
          animation: new Animated.ValueXY(),
        },
      ],
    };
    
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        this.state.heads.map(({animation}) => {
          animation.extractOffset();
          // setValue Animated bug fix
          animation.setValue({x: 0, y: 0});
        });
      },
      onPanResponderMove: (e, {dx, dy}) => {
        this.state.heads[0].animation.setValue({
          x: dx,
          y: dy,
        });

        const animations = this.state.heads
          .slice(1)
          .map(({animation}, index) => {
            return Animated.sequence([
              Animated.delay(index * 20),
              Animated.spring(animation, {
                toValue: {x: dx, y: dy},
              }),
            ]).start();
          });
      },
    });
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.heads
          .slice(0)
          .reverse()
          .map((item, index, items) => {
            const pan =
              index === items.length - 1 ? this._panResponder.panHandlers : {};

            return (
              <Animated.View
                {...pan}
                key={index}
                style={[
                  styles.wrap,
                  {transform: item.animation.getTranslateTransform()},
                ]}>
                <Image source={item.image} style={styles.head} resizeMode="cover" />
                <Text>{item.text}</Text>
              </Animated.View>
            );
          })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrap: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 80,
  },
  head: {
    width: 80,
    height: 80,
    borderRadius: 40,
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  },
});

export default App;
