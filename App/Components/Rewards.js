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
          <Text style={styles.title}> Rewards</Text>
        </View>
        <View style={styles.craving}>
          <Text style={styles.title}> TODAYS CRAVING </Text>

          <View style={styles.goals}>
            <View style={styles.card}>

              <View style={styles.symbol}>
                <View style={styles.circle}>
                  <Image
                    style={styles.star}
                    source={Images.star}/>
                </View>
                <Text style={styles.points}> + 10 PTS </Text>
              </View>

              <Text style={styles.text}> FIND A FOOD TRUCK NEARBY </Text>
            </View>

            <View style={styles.card}>

              <View style={styles.symbol}>
                <View style={styles.circle}>
                  <Image
                    style={styles.star}
                    source={Images.star}/>
                </View>
                <Text style={styles.points}> + 25 PTS </Text>
              </View>

              <Text style={styles.text}> VISIT A FOOD TRUCK </Text>


            </View>
            <View style={styles.card}>

              <View style={styles.symbol}>
                <View style={styles.circle}>
                  <Image
                    style={styles.star}
                    source={Images.star}/>
                </View>
                <Text style={styles.points}> + 50 PTS </Text>
              </View>

              <Text style={styles.text}> LEAVE A REVIEW </Text>
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
  title: {
    marginLeft: 25,
  },
  reward: {
    flex: 2,
    backgroundColor: 'green',
  },
  craving: {
    flex: 8,
    backgroundColor: 'blue',
    justifyContent: 'space-between'
  },
  goals: {
    flex: 1,
    backgroundColor: 'yellow',
    flexDirection: 'column',
    alignItems: 'center'
  },
  card: {
    backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
    width: 330,
    height: 117,
    margin: 20,
  },
  symbol: {
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: 20,
  },
  circle: {
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  star: {
    backgroundColor: 'green',
    height: 30,
    width: 30,
  },
  points: {
    marginTop: 5,
    color: 'white',

  },
  text: {
    width: 125,
    marginBottom: 15,
    marginLeft: 60,
    color: 'white',
  },
});
