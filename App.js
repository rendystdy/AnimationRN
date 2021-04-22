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
    Animated.parallel([
      Animated.timing(this.state.animation, {
        toValue: 12,
        duration: 3500,
      }),
    ]).start();
    // Animated.timing(this.state.animation, {
    //   toValue: 300,
    //   duration: 1500,
    //   useNativeDriver: true,
    // }).start(() => {
    //   Animated.timing(this.state.animation, {
    //     toValue: 0,
    //     duration: 200,
    //     useNativeDriver: true,
    //   }).start();
    // });
  };

  render() {
    const randomValue = 3;
    // const newAnimation = Animated.divide(this.state.animation, randomValue);
    // const newAnimation = Animated.multiply(this.state.animation, randomValue);
    const newAnimation = Animated.modulo(this.state.animation, randomValue);

    const interpolated = newAnimation.interpolate({
      inputRange: [0, 3],
      outputRange: ['0deg', '270deg'],
    });

    const animatedStyle = {
      transform: [{rotate: interpolated}],
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
