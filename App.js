import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';

import {interpolateNumber, interpolateRgb} from 'd3-interpolate';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animation: new Animated.Value(0),
    };
    this.positionInterpolate = interpolateNumber(0, 200);
    this.colorInterpolate = interpolateRgb('rgb(255,99,71)', 'rgb(99,71,255)');
  }

  componentDidMount() {
    this.state.animation.addListener(({value}) => {
      const position = this.positionInterpolate(value);
      const color = this.colorInterpolate(value);

      const style = [
        styles.box,
        {
          backgroundColor: color,
          transform: [{translateY: position}],
        },
      ];
      this._view.setNativeProps({style});
    });
  }

  handlePress = () => {
    Animated.timing(this.state.animation, {
      toValue: 1,
      duration: 500,
    }).start();
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={this.handlePress}>
          <View style={styles.box} ref={view => (this._view = view)} />
        </TouchableWithoutFeedback>
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
  box: {
    width: 50,
    height: 50,
    backgroundColor: 'tomato',
  },
});

export default App;
