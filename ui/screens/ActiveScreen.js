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
  ListView
} from 'react-native';


export default class ActiveScreen extends React.Component {
  static navigationOptions = {
    title: 'Get Active',
    headerStyle: {
      backgroundColor: '#F5FCFF'
    },
  };

  constructor(props) {
    super(props);

    this._ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: this._ds.cloneWithRows([])
    }
  }

  componentDidMount(){
    const requestURL = 'https://plgaia-staging.herokuapp.com/api/v1/post_get_active/4Wa0y74X1mAKKIo2qgiWii';
  
    return fetch(requestURL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: 'Token ZVKgYbjoOxoM9fvuhDvQOAtt'
        }
      })
      .then((response) => response.json())
      .then((responseJson) => {
        const results = responseJson['get_active'];
        this.setState({
          dataSource: this._ds.cloneWithRows(results)
        });
      })
      .catch((error) =>{
        console.error(error);
      });
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
            style={{width: 100, height: 100}}
            source={{uri: `http:${rowData.image.url}`}}
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
