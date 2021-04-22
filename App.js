import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animation: new Animated.Value(0),
    };
  }

  startAnimation = () => {
    Animated.timing(this.state.animation, {
      toValue: 1,
      duration: 1500,
    }).start(() => {
      Animated.timing(this.state.animation, {
        toValue: 2,
        duration: 300,
      }).start();
    });
  };

  render() {
    const animatedInterpolated = this.state.animation.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [0, 300, 0],
    });

    const interpolatedInterpolate = animatedInterpolated.interpolate({
      inputRange: [0, 300],
      outputRange: [1, 0.5],
    });

    const translateXInterpolate = animatedInterpolated.interpolate({
      inputRange: [0, 30, 50, 80, 100, 150, 299, 300],
      outputRange: [0, -30, -50, 80, -100, 300, 0, -100 ]
    });

    const animatedStyle = {
      transform: [
        {
          translateY: animatedInterpolated,
        },
        {
          translateX: translateXInterpolate
        }
      ],
      opacity: interpolatedInterpolate,
    };
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={this.startAnimation}>
          <Animated.View style={[styles.box, animatedStyle]} />
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  box: {
    width: 150,
    height: 150,
    backgroundColor: 'tomato',
  },
});

export default App;
