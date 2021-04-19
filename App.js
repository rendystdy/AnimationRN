import React, {Component} from 'react';
import {Text, View, StyleSheet, Animated, PanResponder} from 'react-native';

//Decay Explanation
// The Animated.decay call is primarily used for dragging and gesture animations. All it requires is you to provide
// a velocity in an x and y direction as well as a friction to slow it down. This means you can create realistic
//  throwing animations, etc.
// The primary use case is for gesture animations after a user has released their finger.

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animation: new Animated.ValueXY(0),
    };
    // this.x = 0;
    // this.y = 0;

    // this.state.animation.addListener(value => {
    //   this.x = value.x,
    //   this.y = value.y
    // });
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        //extraOffset
        this.state.animation.extractOffset();
        // this.state.animation.setOffset({
        //   x: this.x,
        //   y: this.y,
        // });
        // this.state.animation.setValue({
        //   x: 0,
        //   y: 0,
        // });
      },
      onPanResponderMove: Animated.event([
        null,
        {
          dx: this.state.animation.x,
          dy: this.state.animation.y,
        },
      ]),
      onPanResponderRelease: (e, {vx, vy}) => {
        Animated.decay(this.state.animation, {
          velocity: {x: vx, y: vy},
          deceleration: 0.997,
        }).start();
      },
    });
  }

  componentDidMount() {
    // this._panResponder = PanResponder.create({
    //   onStartShouldSetPanResponder: () => true,
    //   onMoveShouldSetPanResponder: () => true,
    //   onPanResponderMove: Animated.event([
    //     null,
    //     {
    //       dx: this.state.animation.x,
    //       dy: this.state.animation.y,
    //     },
    //   ]),
    //   onPanResponderRelease: (e, {vx, vy}) => {
    //     Animated.decay(this.state.animation, {
    //       velocity: {x: vx, y: vy},
    //       deceleration: 0.997,
    //     }).start();
    //   },
    // });
  }

  render() {
    const animatedStyle = {
      transform: this.state.animation.getTranslateTransform(),
    };
    return (
      <View style={styles.container}>
        <Animated.View
          style={[styles.box, animatedStyle]}
          {...this._panResponder.panHandlers}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  box: {
    width: 50,
    height: 50,
    backgroundColor: 'tomato',
  },
});

export default App;
