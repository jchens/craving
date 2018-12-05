import React, { Component } from 'react'
import PropTypes from 'prop-types' //consider using this!
import { StyleSheet, SafeAreaView, View, FlatList, Text, Linking, ActivityIndicator, TouchableOpacity, Image, Dimensions, Button, Alert} from 'react-native'
import { Metrics, Colors, Images } from '../Themes'
import {profilesList} from '../Themes/Profiles.js'

import ProgressBarAnimated from 'react-native-progress-bar-animated';



export default class Rewards extends Component {

  state = {
    progress: 20,
    progressWithOnComplete: 0,
    progressCustomized: 0,
  }

  increase = (key, value) => {
    this.setState({
      [key]: this.state[key] + value,
    });
  }



  render () {

    const barWidth = Dimensions.get('screen').width - 85;
    const progressCustomStyles = {
      backgroundColor: '#FF4D00',
      borderRadius: 0,
      borderColor: '#FF4D00',
    };

    return (
      <View style={styles.container}>

        <View style={styles.reward}>
          <Text style={styles.titleRewards}> Rewards</Text>

          <View style={styles.progress}>

            <View style={styles.checkpoints}>
              <View style={styles.outer1}>
                <View style={styles.inner}>
                </View>
              </View>
              <View style={styles.outer2}>
                <View style={styles.inner}>
                </View>
              </View>
            <View>

              <View style={styles.bar}>


                <ProgressBarAnimated
                  {...progressCustomStyles}
                  width={barWidth}
                  value={this.state.progressWithOnComplete}
                  onComplete={() => {
                    Alert.alert('Hey!', 'onComplete event fired!');
                  }}
                />
              </View>
              <View style={styles.buttonContainer}>
                <View style={styles.buttonInner}>
                  <Button
                    title="Increase 25%"
                    onPress={this.increase.bind(this, 'progressWithOnComplete', 25)}
                  />
                </View>
              </View>
            </View>
          </View>


        <View style={styles.craving}>
          <Text style={styles.titleCraving}> TODAYS CRAVING </Text>
          <View style={styles.goals}>
            <View style={styles.card1}>

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

            <View style={styles.card2}>

              <View style={styles.symbol}>
                <View style={styles.circle}>
                  <Image
                    style={styles.star}
                    source={Images.star}/>
                </View>
                <Text style={styles.points}> + 10 PTS </Text>
              </View>

              <Text style={styles.text}> VISIT A FOOD TRUCK </Text>


            </View>
            <View style={styles.card3}>

              <View style={styles.symbol}>
                <View style={styles.circle}>
                  <Image
                    style={styles.star}
                    source={Images.star}/>
                </View>
                <Text style={styles.points}> + 10 PTS </Text>
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
  titleRewards: {
    marginLeft: 35,
    marginTop: 25,
  },
  titleCraving: {
    marginLeft: 35,
  },
  reward: {
    flex: 2,
  },
  progress: {
    alignItems: 'center',
  },
  outer1: {
    backgroundColor: '#FF4D00',
    height: 30,
    width: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inner: {
    backgroundColor: 'white',
    height: 16,
    width: 16,
    borderRadius: 8,
  },
  outer2: {
    backgroundColor: '#FF4D00',
    height: 30,
    width: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',

  },
  outer3: {
    backgroundColor: '#FF4D00',
    height: 30,
    width: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 300,
    marginTop: 2.5,
  },
  outer4: {
    backgroundColor: '#FF4D00',
    height: 30,
    width: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 300,
    marginTop: 2.5,
  },
  bar: {
    position: 'absolute',
    paddingTop: 10,

  },
  craving: {
    flex: 8,
  },
  goals: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },
  card1: {
    backgroundColor: '#0496FF',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
    width: 330,
    height: 117,
    margin: 15,
  },
  card2: {
    backgroundColor: '#FF4D00',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
    width: 330,
    height: 117,
    margin: 15,
  },
  card3: {
    backgroundColor: '#FFD046',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
    width: 330,
    height: 117,
    margin: 15,
  },
  symbol: {
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: 30,
  },
  circle: {
    backgroundColor: 'white',
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
  label: {
    color: '#999',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 10,
  },
});
