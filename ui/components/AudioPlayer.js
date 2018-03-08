/**
 * Lets Rock
 * https://github.com/ocleo1
 * 
 * @providesModule AudioPlayer
 * @flow
 */

import React from 'react';
import { View, WebView, Platform } from 'react-native';


export default class AudioPlayer extends React.Component {
  componentWillUnmount() {
    this.webView.postMessage("stop");
  }

  render() {
    const uri = Platform.OS === 'ios' ? 'song.html' : 'file:///android_asset/song.html';

    return (
      <WebView
        ref={( webView ) => this.webView = webView}
        source={{uri: uri}}
        mediaPlaybackRequiresUserAction={false}
      />
    );
  }
}