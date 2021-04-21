import React, {Component} from 'react';
import {Text, View, StyleSheet, Animated, TouchableWithoutFeedback} from 'react-native';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animation: new Animated.Value(0),
    };
  }
  componentDidMount() {
    // this.startAnimation();
  }

  startAnimation = () => {
    Animated.timing(this.state.animation, {
      toValue: 300,
      duration: 1500,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(this.state.animation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });
  };

  render() {
    const randomValue = new Animated.Value(50);
    const newAnimation = Animated.add(this.state.animation, randomValue);
    // console.log({newAnimation});
    const animatedStyle = {
      transform: [{translateY: newAnimation}],
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
