import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import Tracking from './App/Components/Tracking';
import HomeMap from './App/Components/HomeMap';
import Rewards from './App/Components/Rewards';

import BottomNavigation, {
  IconTab,
  Badge
} from 'react-native-material-bottom-navigation'
import Icon from '@expo/vector-icons/MaterialCommunityIcons'


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
  nav: {
    paddingTop: 30,
  }
});
