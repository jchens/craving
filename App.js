import React, { Component } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import Onboard from './App/Components/Onboard';
import NavBar from './App/Components/NavBar';
import * as firebase from 'firebase';

import { Metrics, Colors, Images } from './App/Themes';

/* Initialize Firebase */
const firebaseConfig = {
  apiKey: "AIzaSyAra3IIAi3Xdf9IFrxY9y4AQUq43yyR2ZM",
  authDomain: "craving-48bc5.firebaseapp.com",
  databaseURL: "https://FoodTrucks.firebaseio.com",
  storageBucket: "craving-48bc5.appspot.com"
};
firebase.initializeApp(firebaseConfig);

/* 'App' now gets navigation from onboarding to the rest of the app to work. */

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

export default createAppContainer(StackNav);

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: Colors.orange,
    },
});
