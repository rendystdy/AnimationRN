import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Animated,
  PanResponder,
  Dimensions,
} from 'react-native';

import Svg, {Path} from 'react-native-svg';

import {interpolate} from 'flubber';

const startPath = `M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z`;
const endPath = `M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animation: new Animated.ValueXY(0),
    };
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderGrant: (e, gestureState) => {
        this.state.animation.extractOffset();
      },
      onPanResponderMove: Animated.event([
        null,
        {
          dx: this.state.animation.x,
          dy: this.state.animation.y,
        },
      ]),
    });
  }

  componentDidMount() {
    // this._panResponder = PanResponder.create({
    //   onStartShouldSetPanResponder: (evt, gestureState) => true,
    //   onMoveShouldSetPanResponder: (evt, gestureState) => true,
    //   onPanResponderGrant: (e, gestureState) => {
    //     this.state.animation.extractOffset();
    //   },
    //   onPanResponderMove: Animated.event([
    //     null,
    //     {
    //       dx: this.state.animation.x,
    //       dy: this.state.animation.y,
    //     },
    //   ]),
    // });
  }

  handlePress = () => {
    Animated.sequence([
      Animated.timing(this.state.animation, {
        toValue: 1,
        duration: 500,
      }),
      Animated.delay(1500),
      Animated.timing(this.state.animation, {
        toValue: 0,
        duration: 500,
      }),
    ]).start();
  };

  render() {
    const {height} = Dimensions.get('window');

    const inputRange = [0, height / 2 - 50.1, height / 2, height];

    const backgroundColorInterpolate = this.state.animation.y.interpolate({
      inputRange,
      outputRange: [
        'rgb(99,71,255)',
        'rgb(99,71,255)',
        'rgb(255,0,0)',
        'rgb(255,0,0)',
      ],
    });

    const flipInterpolate = this.state.animation.y.interpolate({
      inputRange,
      outputRange: [1, 1, -1, -1],
    });

    const animatedStyles = {
      backgroundColor: backgroundColorInterpolate,
      transform: [
        ...this.state.animation.getTranslateTransform(),
        {
          scale: flipInterpolate,
        },
      ],
    };
    return (
      <View style={styles.container}>
        <View style={[styles.top, styles.center, styles.container]}>
          <Text>Good</Text>
        </View>
        <View style={[styles.center, styles.container]}>
          <Text>Bad</Text>
        </View>
        <Animated.View
          {...this._panResponder.panHandlers}
          style={[styles.box, styles.center, animatedStyles]}>
          <Text>Box</Text>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    position: 'absolute',
    width: 50,
    height: 50,
    top: 20,
    left: 0,
  },
  top: {
    borderBottomWidth: 1,
    borderBottomColor: '#AAA',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
