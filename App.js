import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TruckMap from './App/Components/TruckMap';
import Tracking from './App/Components/Tracking';



export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Tracking />
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
