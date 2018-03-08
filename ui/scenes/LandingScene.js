/**
 * Lets Rock
 * https://github.com/ocleo1
 * 
 * @providesModule LandingScene
 * @flow
 */

import React from 'react';
import {
  ART,
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

const { Surface, Shape, Path } = ART;

export default class LandingScene extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    this.state = {
      curveContainerWidth: 0,
      curveContainerHeight: 0,
      curvePath: null,
      image: null
    }
  }

  _onLayout(event) {
    console.log("This is Container");
    const { height, width } = event.nativeEvent.layout;
    const top = height * 0.2;
    const imageHeight = height * 0.45
    const image = (
      <View style={{
        width: width,
        height: imageHeight,
        backgroundColor: 'transparent',
        position: 'absolute',
        top: top
      }}>
        <Image
          style={{width: width, height: imageHeight}}
          source={{uri: 'biking'}}
        />
      </View>
    );

    this.setState({
      image: image,
    });
  }

  _onCurveLayout(event) {
    console.log("This is Curve");
    const { x, y, height, width } = event.nativeEvent.layout;
    const controlX1 = width / 3;
    const controlX2 = width * 2 / 3;
    const controlY = -15;
    const curve = new Path()
                    .moveTo(x, height)
                    .curveTo(controlX1, controlY, controlX2, controlY, width, height);

    this.setState({
      curveContainerWidth: width,
      curveContainerHeight: height,
      curvePath: curve
    });
  }

  _onPressButton() {
    if (this.props.navigation) {
      this.props.navigation.navigate('Active');
    }
  }

  render() {
    const { curveContainerWidth, curveContainerHeight } = this.state;

    return (
      <View style={styles.container} onLayout={this._onLayout.bind(this)}>
        <View style={{flex: .2, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={styles.headerText}>Grow Together!</Text>
        </View>
        <View style={{flex: .4}} />
        <View style={{flex: .1, borderBottomWidth: 1, borderBottomColor: '#c6f9ff'}} onLayout={this._onCurveLayout.bind(this)}>
          <Surface width={curveContainerWidth} height={curveContainerHeight}>
            <Shape
              d={this.state.curvePath}
              fill="#c6f9ff"
            />
          </Surface>
        </View>
        <View style={{flex: .3, backgroundColor: '#c6f9ff'}}>
          <View style={{flex: .4, alignItems: 'center', justifyContent: 'center'}}>
            <TouchableOpacity onPress={this._onPressButton.bind(this)}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>
                  Get Started
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{flex: .6, alignItems: 'center', justifyContent: 'flex-end', paddingHorizontal: 10, paddingBottom: 20}}>
            <Text style={{fontSize: 10, textAlign: 'center'}}>
              By continuing, you agree to our
              <Text style={{fontWeight: 'bold'}}> Terms of Use & Privacy Policy</Text>
            </Text>
          </View>
        </View>
        { this.state.image }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  button: {
    width: 300,
    height: 30,
    backgroundColor: '#2dd2e5',
    borderColor: '#2dd2e5',
    borderRadius: 20,
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
