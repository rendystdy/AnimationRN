import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  PanResponder,
  StatusBar,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const {width, height} = Dimensions.get('window');

// PanResponder

// One of the issues I've noticed with PanResponder is that people assume it is an all or nothing. By that I mean adding a PanResponder in a parent view means it will steal all of your touches and Touchable items won't be touchable any longer.

// You may be running into this because you copy and pasted it from here the documentation here https://facebook.github.io/react-native/docs/panresponder.html and it includes a capture phase returning true. (I copy and paste this all the time). We'll talk about the capture phase next.

// This is far from the case. As always, React Native internal code is all built on the same components you are using so be sure and always read that code. Navigation is one example that uses a top level PanResponder and only deals with touches on the outer edge of the screen.

// General PanResponder

// The React Native folk built the gesture responding system very similar to the web. The gesture system has a capture phase, just like the web. If you didn't know about the capture system on the web, there is one. The events go from a capture phase and back up through the bubble phase. You may have heard of "event bubbling" where the event starts at the inner most child then moves up each element. However before that the capture phase triggered and traversed from the top down to the element you clicked.

// The capture phase in React Native has two phases per PanResponder. It has onStartShouldSetResponderCapture and onMoveShouldSetResponderCapture. The onStartShouldSetResponderCapture is called on the beginning touch, and onMoveShouldSetResponderCapture is called on every time you move your finger.

// After the capture phase the bottom level touched view will then move back up the chain. The onStartShouldSetResponder function will be called on initial press, then onMoveShouldSetResponder will be called each movement of the finger.

// At any point that a capture phase, or non capture phase returns true that PanResponder will receive the gesture. In that case onResponderGrant will be called, then onResponderMove, then eventually when the user removes their finger onResponderRelease.

// Now do remember the capture and bubble phase are happening on EACH finger movement. So that means if a parent view returns true in onMoveShouldSetResponderCapture phase then the touch will be taken away from the other active PanResponder

// When that happens onResponderTerminationRequest is called on the active PanResponder if it returns true then onResponderTerminate is called. Basically you said "Sure whatever else wants the gesture they can have it".

const getDirectionAndColor = ({moveX, moveY, dx, dy}) => {
  const draggedDown = dy > 30;
  const draggedUp = dy < -30;
  const draggedLeft = dx < -30;
  const draggedRight = dx > 30;
  const isRed = moveY < 90 && moveY > 40 && moveX > 0 && moveX < width;
  const isBlue = moveY > height - 50 && moveX > 0 && moveX < width;
  let dragDirection = '';

  if (draggedDown || draggedUp) {
    if (draggedDown) dragDirection += 'dragged down ';
    if (draggedUp) dragDirection += 'dragged up ';
  }

  if (draggedLeft || draggedRight) {
    if (draggedLeft) dragDirection += 'dragged left ';
    if (draggedRight) dragDirection += 'dragged right ';
  }

  if (isRed) return `red ${dragDirection}`;
  if (isBlue) return `blue ${dragDirection}`;
  if (dragDirection) return dragDirection;
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zone: 'Still Touchable',
    };
    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) =>
        !!getDirectionAndColor(gestureState),
      onPanResponderMove: (evt, gestureState) => {
        const drag = getDirectionAndColor(gestureState);
        this.setState({
          zone: drag,
        });
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
    });
  }

  onPress = () => {
    this.setState({
      zone: 'I got touched with a parent pan responder',
    });
  };

  render() {
    return (
      <View style={styles.container} {...this._panResponder.panHandlers}>
        <StatusBar hidden />
        <View style={styles.zone1} />
        <View style={styles.center}>
          <TouchableOpacity onPress={this.onPress}>
            <Text>{this.state.zone}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.zone2} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  zone1: {
    top: 40,
    left: 0,
    right: 0,
    height: 50,
    position: 'absolute',
    backgroundColor: 'red',
  },
  zone2: {
    left: 0,
    right: 0,
    bottom: 0,
    height: 50,
    position: 'absolute',
    backgroundColor: 'blue',
  },
});

export default App;
