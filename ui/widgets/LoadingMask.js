/**
 * @providesModule LoadingMask
 */

import React from 'react';
import {
  Modal,
  Text,
  View,
  StyleSheet
} from 'react-native';

export default class LoadingMask extends React.Component {
  static propTypes = {
    modalVisible: React.PropTypes.bool
  };

  static defaultProps = {
    modalVisible: false
  };

  render() {
    return (
      <Modal
        animationType={'slide'}
        transparent={true}
        visible={this.props.modalVisible}
        onRequestClose={() => {}}>
        <View style={styles.container}>
          <Text style={{textAlign: 'center', fontSize: 24, color: "white"}}>Loading...</Text>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, .6)'
  }
});
