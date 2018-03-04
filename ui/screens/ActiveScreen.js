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
    title: 'Grow Together',
    headerStyle: {
      backgroundColor: '#F5FCFF'
    },
  };

  constructor(props) {
    super(props);

    this._ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([])
    }
  }

  componentDidMount(){
    const requestURL = 'https://plgaia-staging.herokuapp.com/api/v1/post_get_active/4Wa0y74X1mAKKIo2qgiWii';
  
    return fetch(requestURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authorization': 'Token ZVKgYbjoOxoM9fvuhDvQOAtt'
      })
      .then((responseJson) => {
        const results = responseJson['get_active'];
        this.setState({
          dataSource: this._ds.cloneWithRows(results),
        });
      })
      .catch((error) =>{
        console.error(error);
      });
  }

  _renderRow(rowData) {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10
      }}>
        <Image
          style={{width: imageWidth, height: imageHeight}}
          source={rowData.image.url}
        />
        <Text>{rowData.name}</Text>
        {
          !!rowData.instruction ?
            <Text>{rowData.instruction}</Text> :
            null
        }
        {
          rowData.steps.length() !== 0 ?
            rowData.steps.map((step, index) => {
              return (
                <View key={`${rowData.name}-step-index`}>
                  <Text>{`STEP ${index}`}</Text>
                  <Text>{step}</Text>
                </View>
              );
            })
        }
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView
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
