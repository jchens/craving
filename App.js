import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import HomeMap from './App/Components/HomeMap';
//import TruckMap from './App/Components/TruckMap';
//import Rewards from './App/Components/Rewards';
import Visited from './App/Components/Visited';
import Followed from './App/Components/Followed';

import { Font } from 'expo';
import { Metrics, Colors, Images } from './App/Themes'

import Icon from '@expo/vector-icons/MaterialCommunityIcons'


export default class App extends React.Component {

  state = {
    fontLoaded: false,
  };

  async componentDidMount() {
    await Font.loadAsync({
      'lato-regular': require('./assets/fonts/Lato-Regular.ttf'),
      'lato-bold': require('./assets/fonts/Lato-Bold.ttf'),
      'lato-light': require('./assets/fonts/Lato-Light.ttf'),

    });

    this.setState({ fontLoaded: true });
  }


  render() {
    return (
      <View style={styles.container}>
        {
          this.state.fontLoaded ? (
            // <Text style={{fontFamily: 'lato-bold'}}>Hi!</Text>
            <Visited />
          ) : null
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: Colors.yellow,
    },
  nav: {
    paddingTop: 30,
  }
});
