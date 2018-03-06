/**
 * Lets Rock
 * https://github.com/ocleo1
 * 
 * @providesModule ActiveScene
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
import _ from 'lodash';

import AudioPlayer from 'AudioPlayer';
import { getData } from 'Network';
import { destroyDB, resetDB, allRecords } from 'Database';

const STORE_KEY = '@MyData:date';

export default class ActiveScene extends React.Component {
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
    const date = new Date();
    const dateString = `${date.getFullYear()}${date.getMonth()}${date.getDate()}`;

    AsyncStorage.getItem(STORE_KEY, (err, result) => {
      if (err || _.isEmpty(result) || dateString !== result) {
        AsyncStorage.setItem(STORE_KEY, dateString, () => {
          this._getDataFromServer();
        });
        return;
      }

      this._getDataFromDB();
    });
  }

  _getDataFromDB() {
    allRecords().then((result) => {
      if (_.isEmpty(result)) {
        this._getDataFromServer();
        return;
      }

      this.setState({
        dataSource: this._ds.cloneWithRows(result)
      });
    }).catch((err) => {
      console.log(err);
      this._getDataFromServer();
    });
  }

  _getDataFromServer() {
    getData().then((results) => {
      this.setState({
        dataSource: this._ds.cloneWithRows(results)
      });
      return resetDB(results);
    }).then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
      this.setState({
        dataSource: this._ds.cloneWithRows([])
      });
      destroyDB();
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
