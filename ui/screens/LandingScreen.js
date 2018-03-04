/**
 * Lets Rock
 * https://github.com/ocleo1
 * 
 * @providesModule LandingScreen
 * @flow
 */

import React from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity
} from 'react-native';


export default class LandingScreen extends React.Component {
  static navigationOptions = {
    title: 'Grow Together',
    headerStyle: {
      backgroundColor: '#F5FCFF'
    },
  };

  constructor(props) {
    super(props);

    this.state = {
      imageWidth: 0,
      imageHeight: 0
    }
  }

  _onLayout(event) {
    const { height, width } = event.nativeEvent.layout;
    this.setState({
      imageWidth: width,
      imageHeight: height * 0.6,
    })
  }

  _onPressButton() {
    // Navigation
  }

  render() {
    const { imageWidth, imageHeight } = this.state;

    return (
      <View style={styles.container} onLayout={this._onLayout.bind(this)}>
        <View style={{flex: .6}}>
          <Image
            style={{width: imageWidth, height: imageHeight}}
            source={require('../images/biking.png')}
          />
        </View>
        <View style={{flex: .4, backgroundColor: '#c6f9ff', alignItems: 'center', justifyContent: 'center'}}>
          <TouchableOpacity onPress={this._onPressButton.bind(this)}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>
                Get Started
              </Text>
            </View>
          </TouchableOpacity>
          <View style={{paddingHorizontal: 10}}>
            <Text>
              By continuing, you agree to our
              <Text style={{fontSize: 10, fontWeight: 'bold'}}> Terms of Use & Privacy Policy</Text>
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  button: {
    width: 200,
    height: 30,
    backgroundColor: '#2dd2e5',
    borderColor: '#2dd2e5',
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    width: 180,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold'
  }
});
