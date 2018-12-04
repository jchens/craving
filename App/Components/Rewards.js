import React, { Component } from 'react'
import PropTypes from 'prop-types' //consider using this!
import { StyleSheet, SafeAreaView, View, FlatList, Text, Linking, ActivityIndicator, TouchableOpacity, Image } from 'react-native'
import { Metrics, Colors, Images } from '../Themes'
import {profilesList} from '../Themes/Profiles.js'

export default class Rewards extends Component {




  render () {

    return (
      <View style={styles.container}>
        <View style={styles.reward}>
          <Text> Rewards</Text>
        </View>
        <View style={styles.craving}>
          <Text> TODAYS CRAVING </Text>
          <View style={styles.goals}>
            <View style={styles.card}>
              <Text> hey </Text>
            </View>

            <View style={styles.card}>
              <Text> test </Text>
            </View>

            <View style={styles.card}>
              <Text> hewwwy </Text>
            </View>

          </View>
        </View>
      </View>

    );

  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  reward: {
    flex: 2,
    backgroundColor: 'green',
  },
  craving: {
    flex: 8,
    backgroundColor: 'blue',
  },
  goals: {
    flex: 1,
    backgroundColor: 'yellow',
    flexDirection: 'column',
    alignItems: 'center'
  },
  card: {
    backgroundColor: 'red',
    width: 300,
    height: 100,
    margin: 20,

  }
});
