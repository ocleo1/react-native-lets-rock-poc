/**
 * Lets Rock
 * https://github.com/ocleo1
 * 
 * @providesModule ActiveScreen
 * @flow
 */

import React from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity,
  ListView,
  AsyncStorage
} from 'react-native';

import AudioPlayer from 'AudioPlayer';
import { getData } from 'Network';

const STORE_KEY = '@MyData:key';

export default class ActiveScreen extends React.Component {
  static navigationOptions = {
    title: 'Get Active',
    headerStyle: {
      backgroundColor: '#FFE4D3'
    },
    headerBackTitle: null
  };

  constructor(props) {
    super(props);

    this._ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: this._ds.cloneWithRows([])
    }
  }

  componentDidMount(){
    AsyncStorage.getItem(STORE_KEY, (err, result) => {
      if (err) {
        console.err(err);
        this._getData();
      }

      if (!result) {
        this._getData();
      }
      
      console.log(result);
      this.setState({
        dataSource: this._ds.cloneWithRows(JSON.parse(result))
      });
    });
  }

  _getData() {
    getData().then((results) => {
      AsyncStorage.setItem(STORE_KEY, JSON.stringify(results));
      this.setState({
        dataSource: this._ds.cloneWithRows(results)
      });
    }).catch((error) => {
      console.err(error);
      AsyncStorage.setItem(STORE_KEY, '[]');
      this.setState({
        dataSource: this._ds.cloneWithRows([])
      });
    })
  }

  _renderRow(rowData) {
    return (
      <View style={{
        justifyContent: 'center',
        paddingHorizontal: 20,
        backgroundColor: 'white'
      }}>
        <View style={{marginTop: 30, alignItems: 'center'}}>
          <Image
            style={{width: 150, height: 150}}
            source={{uri: `https:${rowData.image.url}`}}
          />
        </View>
        <View style={{marginTop: 10, alignItems: 'center'}}>
          <Text style={{textAlign: 'center', fontSize: 16, fontWeight: 'bold'}}>{rowData.name}</Text>
        </View>
        {
          !!rowData.instruction ?
            <View style={{marginTop: 10}}>
              <Text>{rowData.instruction}</Text>
            </View> :
            null
        }
        <View style={{marginTop: 10}}>
        {
          rowData.steps.length !== 0 ?
            rowData.steps.map((step, index) => {
              return (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                  key={`${rowData.name}-step-${index}`}>
                  <View style={{marginTop: 10}}>
                    <Text style={{fontSize: 10, color: '#adf5ff'}}>{`STEP ${index}`}</Text>
                  </View>
                  <View style={{marginTop: 10}}>
                    <Text>{step}</Text>
                  </View>
                </View>
              );
            }) :
            null
        }
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView
          enableEmptySections={true}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow.bind(this)}
        />
        <View style={styles.audioPlayer}>
          <AudioPlayer />
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
  audioPlayer: {
    width: 70,
    height: 50,
    position: 'absolute',
    bottom: 70
  }
});
