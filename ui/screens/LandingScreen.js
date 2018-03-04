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
  View
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
        <View style={{flex: .4, backgroundColor: '#64e1ef'}} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  }
});
