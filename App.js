import React, { Component } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator, TabBarBottom, createAppContainer} from 'react-navigation';
import HomeMap from './App/Components/HomeMap';
import Rewards from './App/Components/Rewards';
import Visited from './App/Components/Visited';
import Followed from './App/Components/Followed';
import Profile from './App/Components/Profile';
import { Feather, MaterialIcons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

import { Font } from 'expo';
import { Metrics, Colors, Images } from './App/Themes'

import Icon from '@expo/vector-icons/MaterialCommunityIcons'

const TabNavigator = createBottomTabNavigator(

  {
    HomeMap: {
      screen: HomeMap,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <Feather
            name='map-pin'
            color={tintColor}
            size={20}
          />
        ),
        tabBarLabel: 'Map',
      },
    },
    //Rewards: Rewards,

    Rewards: {
      screen: Rewards,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <Feather
            name='award'
            color={tintColor}
            size={20}
          />
        ),
      },
    },

    Followed: {
      screen: Followed,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <Feather
            name='star'
            color={tintColor}
            size={20}
          />
        ),
        tabBarLabel: 'Followed',
      },
    },

    Visited: {
      screen: Visited,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <Feather
            name='clock'
            color={tintColor}
            size={20}
          />
        ),
        tabBarLabel: 'Followed',
      },
    },

  },
  {
    initialRouteName: 'HomeMap',
    order: ['HomeMap', 'Rewards', 'Followed', 'Visited'],
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      showLabel: false,
      activeTintColor: Colors.orange,
      inactiveTintColor: Colors.gray1,
      //activeBackgroundColor: Colors.gray6,
      tabStyle: {
        //paddingBottom: Metrics.padSmall, // note: idk if this is needed, but the Android bar is in the way
        borderTopWidth: 1,
        borderColor: Colors.gray5,
      },
      style: {
        flexDirection: 'row',
        height: Metrics.nav,
        backgroundColor: Colors.gray7,
        alignItems: 'center',
        justifyContent: 'center',

        // shadowColor: Colors.black,
        // shadowOpacity: Metrics.glow / 10,
        // shadowRadius: 8,
        // shadowOffset: {width: 0, height: -5},

        zIndex: 1,
      },
    },
    animationEnabled: false, // idk what this does lol
    swipeEnabled: true, // I don't think it actually supports swipes lol
  }
);

export default createAppContainer(TabNavigator);

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: Colors.yellow,
    },
});
