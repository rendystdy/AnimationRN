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
      animation: new Animated.Value(1),
    };
  }

  startAnimation = () => {
    Animated.timing(this.state.animation, {
      toValue: 3,
      duration: 1500,
    }).start(() => {
      Animated.timing(this.state.animation, {
        toValue: 0,
        duration: 300,
      }).start();
    });
  };

  render() {
    const scaleInterpolate = this.state.animation.interpolate({
      inputRange: [1, 2],
      outputRange: [1, 2],
      // extrapolate: 'clamp'
      // extrapolate: 'identity'
      extrapolateLeft: 'clamp'
    });

    const animatedStyle = {
      transform: [
        {
          scale: scaleInterpolate,
        }
      ],
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
