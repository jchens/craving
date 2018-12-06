import React, { Component } from 'react'
import PropTypes from 'prop-types' //consider using this!
import {
  StyleSheet,
  SafeAreaView,
  View,
  FlatList, SectionList,
  Text, Linking, ActivityIndicator, TouchableOpacity, Image } from 'react-native'
import { Metrics, Colors, Images } from '../Themes'
import {profilesList} from '../Themes/Profiles.js'

import { material } from 'react-native-typography'
import { Feather, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { Overlay, Button } from 'react-native-elements';

export default class Tracking extends Component {
  constructor() {
    super();
    let arr = []
    for(let i = 0; i < 7; i++) {
      arr.push(false);
    }
    this.state = {
      fav: arr,
    };
  }

  updatedState = (key) => {
    console.log("im here");
    console.log(key);
    let temp = this.state.fav;
    temp[key] = !temp[key];
    console.log(temp);
    this.setState({
        fav: temp,
    })
  }


  render () {

    return (
        <View style={styles.container}>

            <View style={styles.titleContainer}>
              <Text style={styles.title}>{'Followed'}</Text>
            </View>

            <View style={styles.listContainer}>

              {/* flatlist / sectionlist */}
              <SectionList
                renderItem={({item, index, section}) =>

                <View style={[styles.listItem]}>

                  {/* info: holding photo, info, and star*/}
                  <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    alignItems: 'flex-start',
                    paddingHorizontal: Metrics.pad * 1.5,
                    paddingBottom: Metrics.padSmall,

                    // alignItems: 'stretch',
                  }}>


                    {/* view to hold image for shadow*/}
                    <View style={[styles.shadowSmall, style={
                      flex: 1,
                    }]}>
                      <Image source={item.image} resizeMode='cover' style={{
                        borderRadius: Metrics.curve,
                        aspectRatio: 1,
                        width: undefined,
                        height: undefined,
                      }}/>
                    </View>

                    {/* info */}
                    <View style={{
                      flex: 2,
                      paddingHorizontal: Metrics.padSmall,
                      // backgroundColor: Colors.purple,
                    }}>
                      <Text style={{
                        fontSize: Metrics.font3,
                      }}> {item.name} </Text>
                      <Text style={{
                        color: Colors.gray3,
                        fontSize: Metrics.font5,
                        paddingVertical: 5
                      }}> {item.cuisine} </Text>
                      <Text style={{
                        flexWrap: 'wrap',
                        textAlign: 'left',
                        fontSize: Metrics.font5,
                      }}> {item.description} </Text>
                    </View>

                    {/* buttom column */}
                    <View style={{
                      flexDirection: 'column',
                      justifyContent: 'flex-start',
                      // backgroundColor: Colors.purple,
                    }}>

                      <Button
                        buttonStyle={[styles.circleButton, styles.glow, style={backgroundColor: Colors.yellow}]}
                        containerStyle={[styles.buttonContainer, style={backgroundColor: Colors.yellow}]}
                        titleStyle={{
                          color: Colors.white
                        }}
                        title=''
                        icon={
                          <FontAwesome
                            name='star'
                            size={Metrics.button/2}
                            color='white'
                          />
                        }
                      />

                      <View style={{
                        height: Metrics.pad / 2,
                        // backgroundColor: Colors.blue,
                      }}>
                      </View>

                      <Button
                        onPress={console.log('should run this.goToTruck')}
                        buttonStyle={[styles.circleButton, style={backgroundColor: Colors.orange}]}
                        containerStyle={[styles.buttonContainer, style={backgroundColor: Colors.orange}]}
                        titleStyle={{
                          color: Colors.white,
                          fontSize: Metrics.font4,
                        }}
                        title=''
                        icon={
                          <Feather
                            name='map-pin'
                            size={18}
                            color='white'
                          />
                        }
                      />
                    </View>
                  </View>

                  {/* button Row */}
                  <View style={styles.buttonRow}>

                    <View style={{
                      flexDirection: 'row',
                      justifyContent: 'space-evenly',
                      alignItems: 'center',
                      backgroundColor: Colors.white,
                      borderColor: Colors.orange,
                      borderWidth: 1,
                      borderRadius: Metrics.button,
                    }}>
                    </View>

                    {/* view to hold right button */}
                    <View style={{
                      flexDirection: 'row',
                      justifyContent: 'space-evenly',
                      alignItems: 'center',
                    }}>
                      <Button
                        buttonStyle={[styles.button, style={backgroundColor: Colors.blue}]}
                        containerStyle={[styles.buttonContainer, style={backgroundColor: Colors.blue}]}
                        titleStyle={{
                          color: Colors.white,
                          fontSize: Metrics.font4,
                        }}
                        title='Profile'
                        icon={
                          <Feather
                            name='truck'
                            size={17}
                            color='white'
                          />
                        }
                      />
                    </View>

                  </View>

                </View>
              }
                renderSectionHeader={({section: {title}}) => (
                  <View style={[styles.shadowSmall, style={
                    backgroundColor: Colors.white,
                    height: Metrics.button,
                    justifyContent: 'center',
                    paddingHorizontal: Metrics.pad,

                    shadowColor: Colors.black,
                    shadowOpacity: Metrics.shadow / 2,
                    shadowRadius: 5,
                    shadowOffset: {width: 0, height: 0},
                  }]}>
                    <Text style={{
                      fontWeight: 'bold',
                      color: Colors.gray1,
                    }}>{title}</Text>
                  </View>
                )}
                sections={[
                  {title: 'TODAY', data: [profilesList[5]]},
                  {title: 'SATURDAY', data: [profilesList[6], profilesList[1], profilesList[2]]},
                  {title: 'SUNDAY', data: [profilesList[0], profilesList[3]]},
                  {title: 'MONDAY', data: [profilesList[4], profilesList[6]]},
                ]}
                keyExtractor={(item, index) => item + index}
              />

              {/* bottom nav */}
              <View style={[styles.nav, styles.shadow]}>
              </View>

            </View>

        </View>
      );

  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: Colors.white,
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

  title: {
    color: Colors.black,
    fontSize: Metrics.font3,
    paddingBottom: Metrics.pad / 2,
  },

  listContainer: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',

    // TODO: change this to reveal some cool illustration
    backgroundColor: Colors.purple,
  },

  listItem: {
    paddingVertical: Metrics.pad * 1.25,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    backgroundColor: Colors.white,

    borderColor: Colors.gray6,
    borderBottomWidth: 1,
  },

  info: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    paddingHorizontal: Metrics.pad * 1.5,

    backgroundColor: Colors.white,
  },

  shadow: {
    shadowColor: Colors.black,
    shadowOpacity: Metrics.glow / 4,
    shadowRadius: 20,
    shadowOffset: {width: 0, height: 4}
  },

  shadowSmall: {
    shadowColor: Colors.black,
    shadowOpacity: Metrics.shadow / 2,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 2},
  },

  circleButton: {
    borderRadius: Metrics.button,
    height: Metrics.button,
    width: Metrics.button,
    justifyContent: 'center',
    alignItems: 'center',

  },
  glow: {
    shadowColor: Colors.yellow,
    shadowOpacity: Metrics.glow / 2,
    shadowRadius: 10,
  },

  button: {
    borderRadius: Metrics.button,
    height: Metrics.button,
    paddingLeft: Metrics.button / 2,
    paddingRight: Metrics.button / 4,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonContainer: {
    borderRadius: Metrics.button,

  },

  buttonRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingTop: 5,
  },

  button_filled: {
    backgroundColor: Colors.yellow,
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
    width: 80,
    borderRadius: 40

  },
  star_filled: {
    backgroundColor: Colors.yellow,
    height: 50,
    width: 50,
  },

  nav: {
    height: Metrics.nav,
    backgroundColor: Colors.purple,
  },


});
