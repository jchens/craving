import React, { Component } from 'react'
import PropTypes from 'prop-types' //consider using this!
import { StyleSheet, SafeAreaView, View, FlatList, Text, Linking, ActivityIndicator, TouchableOpacity, Image, Dimensions, Button, Alert} from 'react-native'
import { Metrics, Colors, Images } from '../Themes'
import {profilesList} from '../Themes/Profiles.js'

import ProgressBarAnimated from 'react-native-progress-bar-animated';

import { Font } from 'expo';




export default class Rewards extends Component {

  state = {
    progress: 20,
    progressWithOnComplete: 50,
    progressCustomized: 0,
    fontLoaded: false,
  }

  increase = (key, value) => {
    this.setState({
      [key]: this.state[key] + value,
    });
  }


  async componentDidMount() {
    await Font.loadAsync({
      'lato-regular': require('../../assets/fonts/Lato-Regular.ttf'),
      'lato-bold': require('../../assets/fonts/Lato-Bold.ttf'),
      'lato-black': require('../../assets/fonts/Lato-Black.ttf'),
    });
    this.setState({ fontLoaded: true });
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
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              flex: 1,
            }}>


              <View style={{
                width: 25,
                height: 25,
                borderRadius: 12.5,
                backgroundColor: '#FF4D00',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 16.5,
                marginRight: 26,
              }}>
                <View style={{
                  width: 6,
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: '#FF4D00',
                }}>
                </View>
              </View>

              <View style={{
                width: 25,
                height: 25,
                borderRadius: 12.5,
                backgroundColor: '#FF4D00',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 16.5,
                marginLeft: 25,
                marginRight: 25,
              }}>
                <View style={{
                  width: 6,
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: '#FF4D00',
                }}>
                </View>
              </View>

              <View style={{
                width: 25,
                height: 25,
                borderRadius: 12.5,
                backgroundColor: '#FF4D00',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 16.5,
                marginLeft: 25,
                marginRight: 25,
              }}>
                <View style={{
                  width: 6,
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: '#FF4D00',
                }}>
                </View>
              </View>

              <View style={{
                width: 25,
                height: 25,
                borderRadius: 12.5,
                backgroundColor: '#FF4D00',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 16.5,
                marginLeft: 25,
                marginRight: 25,
              }}>
                <View style={{
                  width: 6,
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: 'white',
                  zIndex: 1,
                }}>
                </View>
              </View>

              <View style={{
                width: 25,
                height: 25,
                borderRadius: 12.5,
                backgroundColor: '#FF4D00',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 16.5,
                marginLeft: 26,
              }}>
                <View style={{
                  width: 6,
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: 'white',
                }}>
                </View>
              </View>


            </View>




            <View style={styles.bar}>

              <ProgressBarAnimated
                {...progressCustomStyles}
                width={barWidth}
                height={8}
                value={this.state.progressWithOnComplete}
                onComplete={() => {
                  Alert.alert('Hey!', 'onComplete event fired!');
                }}
              />
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
                    source={Images.star}
                  />
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
                    source={Images.star}
                  />
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
                    source={Images.star}
                  />
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
    fontFamily: 'lato-bold',
    fontSize: 24,
    marginLeft: 35,
    marginTop: 25,
  },
  titleCraving: {
    fontFamily: 'lato-bold',
    fontSize: 18,
    marginLeft: 35,

  },
  reward: {
    flex: 2,
  },
  progress: {
    alignItems: 'center',
    flex: 1,
  },
  bar: {
    position: 'absolute',
    paddingTop:25,
    zIndex: 0,

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
    backgroundColor: 'blue',
    height: 30,
    width: 30,
  },
  points: {
    fontFamily: 'lato-bold',
    marginTop: 5,
    color: 'white',

  },
  text: {
    fontFamily: 'lato-bold',
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 20,
    width: 125,
    marginBottom: 10,
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
