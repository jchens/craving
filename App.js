import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TruckMap from './App/Components/TruckMap';
import Tracking from './App/Components/Tracking';
import Profiles from './App/Themes/Profiles.js'



export default class App extends React.Component {
  render() {
    var setProfile = Profiles.random();
    return (
      <View style={styles.container}>
        <TruckMap profile = {this.setProfile}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
