/**
 * Lets Rock
 * https://github.com/ocleo1
 * @flow
 */

import React from 'react';
import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';

import LandingScreen from 'LandingScreen';
import ActiveScreen from 'ActiveScreen';

const RootStack = StackNavigator(
  {
    Landing: {
      screen: LandingScreen,
    },
    Active: {
      screen: ActiveScreen
    }
  },
  {
    initialRouteName: 'Landing'
  }
);

export default class LetsRock extends React.Component {
  render() {
    return <RootStack />;
  }
}

AppRegistry.registerComponent('LetsRock', () => LetsRock);
