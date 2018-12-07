import React, { Component } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import { NavigationActions, StackActions } from 'react-navigation';

import { Colors } from '../Themes';

/* Disables being able to go back to the onboarding screens from the main app. */
const resetAction = StackActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({
      routeName: 'Main',
    })
  ]
});

export default class Onboard extends Component {

  doneCallback = () => {
    /* Hitting the done button navigates to the rest of the app. */
    this.props.navigation.dispatch(resetAction);
  }

  skipCallback = () => {
    /* Hitting the skip button navigates to the rest of the app. */
    this.props.navigation.dispatch(resetAction);
  }

  render() {
    return (
      <Onboarding
        onDone={() => this.doneCallback()}
        onSkip={() => this.skipCallback()}
        pages={[
          {
            backgroundColor: '#ec5b29',
            image: <Image style={{width: 250, height: 250, resizeMode: 'contain'}} source={require('../Images/logo-gray.png')} />,
            title: 'Welcome to Craving!',
            subtitle: 'Discover, review, and track food trucks',
          },
          {
            backgroundColor: Colors.purple,
            image: <Image style={{width: 300, height: 300, resizeMode: 'contain'}} source={require('../Images/Onboarding/onboarding0.png')} />,
            title: 'Find Trucks',
            subtitle: 'Use the map to find food trucks near you',
          },
          {
            backgroundColor: Colors.yellow,
            image: <Image style={{width: 300, height: 300, resizeMode: 'contain'}} source={require('../Images/Onboarding/onboarding1.png')} />,
            title: 'Follow Trucks',
            subtitle: 'Click the star icon to add a truck to your Follow list',
          },
          {
            backgroundColor: Colors.blue,
            image: <Image style={{width: 300, height: 300, resizeMode: 'contain'}} source={require('../Images/Onboarding/onboarding2.png')} />,
            title: 'Set Reminders',
            subtitle: 'Click the bell icon to set a reminder about upcoming food trucks',
          },
          {
            backgroundColor: Colors.orange,
            image: <Image style={{width: 300, height: 300, resizeMode: 'contain'}} source={require('../Images/Onboarding/onboarding3.png')} />,
            title: 'Check in at Trucks',
            subtitle: 'Keep track of the trucks you\'ve visited',
          }
        ]}
      />
    );
  }
}
