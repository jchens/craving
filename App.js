import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import Tracking from './App/Components/Tracking';
import HomeMap from './App/Components/HomeMap';



export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <HomeMap />
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
