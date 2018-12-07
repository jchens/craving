import React, { Component } from 'react'
import PropTypes from 'prop-types' //consider using this!
import { StyleSheet, SafeAreaView, View, FlatList, Text, Linking, ActivityIndicator, TouchableOpacity, Image, Dimensions, Button, Alert} from 'react-native'
import { Metrics, Colors, Images } from '../Themes'
import {profilesList} from '../Themes/Profiles.js'

import ProgressBarAnimated from 'react-native-progress-bar-animated';
import { Feather, MaterialIcons, FontAwesome, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';


import { Font } from 'expo';
import { MenuProvider } from 'react-native-popup-menu';

import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';




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
          <View style={styles.titleContainer}>
            <Text style={styles.titleRewards}> Rewards</Text>
          </View>

          <View style={styles.progress}>
            <View style={{
              position: 'absolute',
              marginTop: 45,

            }}>
              <Text  style={styles.points}> 50 PTS </Text>
            </View>
            <View style={{
              position: 'absolute',
              marginTop: 45,
              paddingLeft: 300,

            }}>
              <Text  style={styles.points}> 100 PTS </Text>
            </View>
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
                marginTop: 14.5,
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
          <View style={[styles.shadowSmall, styles.sectionHead]}>
            {
              this.state.fontLoaded ? (
                <Text style={{
                  fontFamily: 'lato-bold',
                  color: Colors.gray1,
                  letterSpacing: 1,
                  fontSize: Metrics.font5
                }}>{"TODAY'S CRAVINGS"}</Text>
              ) : null
            }
          </View>
          <View style={styles.goals}>

            <View style={styles.listItem}>

              <View style={[styles.symbol]}>
                <View style={styles.symbolContainer}>
                  <AntDesign
                    name='find'
                    size={Metrics.button/1.5}
                    color= {Colors.white}
                  />
                </View>
                <Text style={styles.points}> + 10 PTS </Text>
              </View>

              <View style={styles.textContainer}>
                {
                  this.state.fontLoaded ? (
                    <Text style={styles.text}>Find a food truck nearby</Text>
                  ) : null
                }
              </View>
            </View>

            <View style={styles.listItem}>

              <View style={[styles.symbol]}>
                <View style={styles.symbolContainer}>
                  <Feather
                    name='check-circle'
                    size={Metrics.button/1.5}
                    color= {Colors.white}
                  />
                </View>
                <Text style={styles.points}> + 10 PTS </Text>
              </View>

              <View style={styles.textContainer}>
                {
                  this.state.fontLoaded ? (
                    <Text style={styles.text}>Visit a food truck</Text>
                  ) : null
                }
              </View>
            </View>

            <View style={styles.listItem}>
              <View style={[styles.symbol]}>
                <View style={styles.symbolContainer}>
                  <MaterialCommunityIcons
                    name='comment-text-outline'
                    size={Metrics.button/1.5}
                    color= {Colors.white}
                  />
                </View>
                <Text style={styles.points}> + 10 PTS </Text>
              </View>

              <View style={styles.textContainer}>
                {
                  this.state.fontLoaded ? (
                    <Text style={styles.text}>Leave a review</Text>
                  ) : null
                }
              </View>
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
    color: Colors.gray1,
    fontSize: Metrics.font3,
    paddingBottom: Metrics.pad / 2,
    fontFamily: 'lato-bold',

  },
  titleContainer: {
    height: Metrics.nav * 1.25,
    backgroundColor: Colors.gray7,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',

    borderBottomWidth: 1,
    borderColor: Colors.gray5,
  },

  sectionHead: {
    backgroundColor: Colors.white,
    height: Metrics.button,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Metrics.pad,
    flexDirection: 'row',
  },

  shadow: {
    shadowColor: Colors.black,
    shadowOpacity: Metrics.glow / 2,
    shadowRadius: 20,
    shadowOffset: {width: 0, height: 4}
  },

  shadowSmall: {
    shadowColor: Colors.black,
    shadowOpacity: Metrics.glow / 9,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 4},
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
    paddingVertical: Metrics.pad * 1.25,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: Colors.white,

    borderColor: Colors.gray6,
    borderBottomWidth: 1,
    paddingHorizontal: Metrics.pad * 1.25,
  },

  listItem: {
    paddingVertical: Metrics.pad * 1.25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: Colors.purple,

    borderColor: Colors.gray6,
    borderBottomWidth: 1,
    paddingHorizontal: Metrics.pad * 1.25,
  },

  symbol: {
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
  },

  symbolContainer: {
    backgroundColor: Colors.orange,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: 50,
    borderRadius: 25,
  },

  points: {
    fontFamily: 'lato-bold',
    marginTop: 5,
    color: Colors.gray1,

  },

  textContainer: {
    flex: 2,
    // backgroundColor: Colors.blue,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'lato-bold',
    fontSize: Metrics.font4,
    textAlign: 'center',
    // lineHeight: 20,
    width: 125,
    // marginBottom: 10,
    // marginLeft: 60,
    color: Colors.gray1,
  },

  label: {
    color: '#999',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 10,
  },
});
