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

  render() {
    const opacityInterpolate = this.state.animation.interpolate({
      inputRange: [0, 3000],
      outputRange: [1, 0],
    });

    const backgroundStyle = {
      backgroundColor: 'tomato',
      opacity: opacityInterpolate,
    };
    return (
      <View style={styles.container}>
        <Animated.ScrollView
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    y: this.state.animation,
                  },
                },
              },
            ],
            {useNativeDriver: true},
          )}>
          <Animated.View style={[styles.content, backgroundStyle]} />
        </Animated.ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    height: 3000,
  },
});

export default App;
