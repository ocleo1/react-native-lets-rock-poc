/**
 * Lets Rock
 * https://github.com/ocleo1
 * @flow
 */

import React from 'react';
import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';

import LandingScene from 'LandingScene';
import ActiveScene from 'ActiveScene';

const RootStack = StackNavigator(
  {
    Landing: {
      screen: LandingScene,
    },
    Active: {
      screen: ActiveScene
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
