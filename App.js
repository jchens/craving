import React, { Component } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator, TabBarBottom, createAppContainer} from 'react-navigation';
import HomeMap from './App/Components/HomeMap';
//import Rewards from './App/Components/Rewards';
import Visited from './App/Components/Visited';
import Followed from './App/Components/Followed';
import Profile from './App/Components/Profile';
import NavBar from './App/Components/NavBar';
import { Feather, MaterialIcons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import Onboarding from 'react-native-onboarding-swiper';

import { Font } from 'expo';
import { Metrics, Colors, Images } from './App/Themes';

import Icon from '@expo/vector-icons/MaterialCommunityIcons';

/* Placeholder */
export default class App extends Component {
  render() {
    return (
      <NavBar />
    );
  }
}
