/**
 * Lets Rock
 * https://github.com/ocleo1
 * 
 * @providesModule AudioPlayer
 * @flow
 */

import React from 'react';
import { View, WebView } from 'react-native';


export default class AudioPlayer extends React.Component {
  componentWillUnmount() {
    this.webView.postMessage("stop");
  }

  render() {
    return (
      <WebView
        ref={( webView ) => this.webView = webView}
        source={require('./audio.html')}
        mediaPlaybackRequiresUserAction={false}
      />
    );
  }
}