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
      colorAnimation: new Animated.Value(0),
      scaleAnimation: new Animated.Value(1),
    };
  }

  handlePress = () => {
    // PARALLEL
    // Animated.parallel([
    //   Animated.timing(this.state.colorAnimation, {
    //     toValue: 1,
    //     duration: 500,
    //   }),
    //   Animated.timing(this.state.scaleAnimation, {
    //     toValue: 2,
    //     duration: 300,
    //     // useNativeDriver: true,
    //   }),
    // ]).start();

    // SQUENCE
    // Animated.sequence([
    //   Animated.timing(this.state.colorAnimation, {
    //     toValue: 1,
    //     duration: 500,
    //   }),
    //   Animated.timing(this.state.scaleAnimation, {
    //     toValue: 2,
    //     duration: 300,
    //     // useNativeDriver: true,
    //   }),
    // ]).start();

    // //STAGGER
    // Animated.stagger(4000, [
    //   Animated.timing(this.state.colorAnimation, {
    //     toValue: 1,
    //     duration: 500,
    //   }),
    //   Animated.timing(this.state.scaleAnimation, {
    //     toValue: 2,
    //     duration: 300,
    //     // useNativeDriver: true,
    //   }),
    // ]).start();
    
    // DELAY
    Animated.sequence([
      Animated.timing(this.state.colorAnimation, {
        toValue: 1,
        duration: 500,
      }),
      Animated.timing(this.state.scaleAnimation, {
        toValue: 2,
        duration: 300,
        // useNativeDriver: true,
      }),
      Animated.delay(1500),
      Animated.parallel([
        Animated.timing(this.state.colorAnimation, {
          toValue: 0,
          duration: 500,
        }),
        Animated.timing(this.state.scaleAnimation, {
          toValue: 1,
          duration: 300,
          // useNativeDriver: true,
        }),
      ])
    ]).start();
  };

  render() {
    const backgroundColorIntepolated = this.state.colorAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: ['rgb(255,99,71)', 'rgb(99,71,255)'],
    });
    const boxStyle = {
      backgroundColor: backgroundColorIntepolated,
      transform: [{scale: this.state.scaleAnimation}],
    };
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={this.handlePress}>
          <Animated.View style={[styles.box, boxStyle]}>
            <Text style={styles.text}>Hello Parallel</Text>
          </Animated.View>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#FFF',
  },
});

export default App;
