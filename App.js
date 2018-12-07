import React, { Component } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator, TabBarBottom, createAppContainer, createStackNavigator } from 'react-navigation';
import HomeMap from './App/Components/HomeMap';
//import Rewards from './App/Components/Rewards';
import Visited from './App/Components/Visited';
import Followed from './App/Components/Followed';
import Profile from './App/Components/Profile';
import NavBar from './App/Components/NavBar';
import Onboard from './App/Components/Onboard';
import { Feather, MaterialIcons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import Onboarding from 'react-native-onboarding-swiper';

import { Font } from 'expo';
import { Metrics, Colors, Images } from './App/Themes';

import Icon from '@expo/vector-icons/MaterialCommunityIcons';

const StackNav = createStackNavigator(
  {
    // these names suck lol I am bad with names :(
    Onboarding: Onboard,
    Main: NavBar,
  },
  {
    /* These options hide the stack navigator at the top. */
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false
    }
  }
);

/* Main app gets navigation from onboarding to the rest of the app to work. */
export default createAppContainer(StackNav);
