import React, {Component, useRef} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Animated,
  KeyboardAvoidingView,
  ImageBackground,
} from 'react-native';

import Background from './background.jpg';

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const createAnimationStyle = animation => {
  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [-5, 0],
  });

  return {
    opacity: animation,
    transform: [
      {
        translateY,
      },
    ],
  };
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: new Animated.Value(0),
      password: new Animated.Value(0),
      button: new Animated.Value(0),
    };
    this._email;
  }

  componentDidMount() {
    Animated.stagger(1000, [
      Animated.timing(this.state.email, {
        toValue: 1,
        duration: 200,
      }),
      Animated.timing(this.state.password, {
        toValue: 1,
        duration: 200,
      }),
      Animated.timing(this.state.button, {
        toValue: 1,
        duration: 200,
      }),
    ]).start(() => {
      this._email.getNode().focus();
    });
  }

  render() {
    const emailStyle = createAnimationStyle(this.state.email);
    const passwordStyle = createAnimationStyle(this.state.password);
    const buttonStyle = createAnimationStyle(this.state.button);

    return (
      <View style={styles.container}>
        <ImageBackground
          source={Background}
          resizeMode="cover"
          style={[StyleSheet.absoluteFill, {width: null, height: null}]}>
          <View style={styles.container} />
          <KeyboardAvoidingView style={styles.form} behavior="padding">
            <View style={styles.container}>
              <Text style={styles.title}>Login</Text>
              <AnimatedTextInput
                ref={email => {
                  this._email = email;
                }}
                style={[styles.input, emailStyle]}
                placeholder="Email"
                keyboardType="email-address"
              />
              <AnimatedTextInput
                placeholder="Password"
                style={[styles.input, passwordStyle]}
                secureTextEntry
              />
              <TouchableOpacity>
                <Animated.View style={[styles.button, buttonStyle]}>
                  <Text style={styles.buttonText}>Login</Text>
                </Animated.View>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
          <View style={styles.container} />
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 30,
    color: '#FFF',
    backgroundColor: 'transparent',
    textAlign: 'center',
    marginBottom: 10,
  },
  form: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,.25)',
    paddingVertical: 10,
  },
  input: {
    width: 250,
    height: 35,
    paddingHorizontal: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#FFF',
    color: '#333',
    backgroundColor: '#FFF',
  },
  button: {
    marginTop: 10,
    backgroundColor: 'tomato',
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 5,
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFF',
    fontSize: 16,
  },
});

export default App;
