import React, { Component } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';

import { Colors } from '../Themes';

export default class Onboard extends Component {
  doneCallback = () => {
    /* Hitting the done button navigates to the rest of the app. */
    this.props.navigation.navigate('Main');
  }

  skipCallback = () => {
    /* Hitting the skip button navigates to the rest of the app. */
    this.props.navigation.navigate('Main');
  }

  render() {
    return (
      <Onboarding
        onDone={() => this.doneCallback()}
        onSkip={() => this.skipCallback()}
        pages={[
          {
            backgroundColor: Colors.yellow,
            image: <Image source={require('../Images/Onboarding/placeholder.png')} />,
            title: 'Welcome to Craving!',
            subtitle: 'Discover, review, and track food trucks',
          },
          {
            backgroundColor: Colors.blue,
            image: <Image source={require('../Images/Onboarding/placeholder2.png')} />,
            title: 'Follow Trucks',
            subtitle: 'Click the star icon to add a truck to your Follow list',
          },
          {
            backgroundColor: Colors.orange,
            image: <Image source={require('../Images/Onboarding/placeholder3.png')} />,
            title: 'Set Reminders',
            subtitle: 'Click the bell icon to set a reminder about upcoming food trucks',
          },
          {
            backgroundColor: Colors.purple,
            image: <Image source={require('../Images/Onboarding/placeholder4.png')} />,
            title: 'Some other feature',
            subtitle: 'Description here',
          }
        ]}
      />
    );
  }
}
