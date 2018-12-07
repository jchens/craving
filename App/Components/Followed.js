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
import { Feather, MaterialIcons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { Overlay, Button } from 'react-native-elements';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Font } from 'expo';

export default class Followed extends Component {
  constructor() {
    super();
    let arr = []
    for(let i = 0; i < 7; i++) {
      arr.push(true);
    }
    let remind = []
    for(let i = 0; i < 7; i++) {
      remind.push('None');
    }

    this.state = {
      starArray: arr,
      remindArray: remind,
      activeReminderIndex: 0,

      isVisible: false,
      isDateTimePickerVisible: false,
      fontLoaded: false,

    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      'lato-regular': require('../../assets/fonts/Lato-Regular.ttf'),
      'lato-bold': require('../../assets/fonts/Lato-Bold.ttf'),
      'lato-black': require('../../assets/fonts/Lato-Black.ttf'),
    });
    this.setState({ fontLoaded: true });
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

  toggleArray = (item) => {
    console.log(profilesList.indexOf(item));

    let temp = this.state.starArray;
    temp[profilesList.indexOf(item)] = !temp[profilesList.indexOf(item)]
    this.setState({
        starArray: temp,
    })
  }

  toggleRemindArray = (item) => {
    console.log(profilesList.indexOf(item));

    this.setState({
        activeReminderIndex: profilesList.indexOf(item),
        isVisible: !this.state.isVisible,
    })
  }

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
    let temp = this.state.remindArray;
    temp[this.state.activeReminderIndex] = date.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'});
    this.setState({
        remindArray: temp,
        isVisible: !this.state.isVisible,
    })
    console.log('A time has been picked: ', this.state.remindArray[this.state.activeReminderIndex]);

    this._hideDateTimePicker();
  };

  render () {

    return (

        <View style={styles.container}>

          {/* Remind Overlay */}
          <Overlay
            isVisible={this.state.isVisible}
            onBackdropPress={() => this.setState({
              isVisible: !this.state.isVisible
            })}
            windowBackgroundColor='rgba(0,0,0,0.25)'
            containerStyle={styles.overlayContainer}
            overlayStyle={[styles.overlay, styles.shadow]}
            fullScreen={true}
            >


            {
              this.state.fontLoaded ? (
                <Text style={{
                  fontFamily: 'lato-bold',
                  color: Colors.gray1,
                  fontSize: Metrics.font3,
                  textAlign: 'center',
                  paddingBottom: Metrics.pad,
                }}>Set a reminder</Text>
              ) : null
            }

            {/* Set time options*/}
            <DateTimePicker
              isVisible={this.state.isDateTimePickerVisible}
              onConfirm={this._handleDatePicked}
              onCancel={this._hideDateTimePicker}
              mode='datetime'
              titleIOS='Set a reminder for this truck'
            />



            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly'
            }}>
              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                backgroundColor: Colors.white,
                borderColor: Colors.orange,
                borderWidth: 1,
                borderRadius: Metrics.button
              }}>

                {
                  this.state.fontLoaded ? (
                    <Text
                      style={{
                        paddingHorizontal: Metrics.pad,
                        color: Colors.orange,
                        fontFamily: 'lato-regular',
                        fontSize: Metrics.font3,
                      }}>
                      {this.state.remindArray[this.state.activeReminderIndex]}
                    </Text>
                  ) : null
                }

                <Button
                  onPress={this._showDateTimePicker}
                  buttonStyle={[styles.circleButton, style={backgroundColor: Colors.orange, paddingHorizontal: Metrics.smallPad}]}
                  containerStyle={[styles.buttonContainer], style={
                    backgroundColor: Colors.orange,
                    borderTopRightRadius: Metrics.button,
                    borderBottomRightRadius: Metrics.button,
                    paddingHorizontal: Metrics.pad / 2,
                  }}
                  titleStyle={{
                    color: Colors.white
                  }}
                  title=''
                  icon={
                    <Feather
                      name='edit'
                      size={20}
                      color='white'
                    />
                  }
                />
              </View>
            </View>

          </Overlay>

          <View style={[styles.titleContainer]}>
            {
              this.state.fontLoaded ? (
                <Text style={styles.title}>{'Followed'}</Text>
              ) : null
            }
          </View>

          <View style={styles.listContainer}>

            {/* flatlist / sectionlist */}
            <SectionList
              renderItem={({item, index}) =>

              <View style={[styles.listItem]}>

              {/* hold photo, info, and address (to the right is the button column)*/}
                <View style={{
                  flex: 1,
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                }}>

                  {/* info: holding photo, info*/}
                  <View style={styles.info}>

                    {/* view to hold image for shadow*/}
                    <View style={[styles.shadowSmall, style={
                      flex: 1,
                      backgroundColor: Colors.white,
                      //borderRadius: Metrics.curve,
                      borderWidth: 4,
                      borderColor: Colors.white,

                      shadowColor: Colors.black,
                      shadowOpacity: Metrics.shadow * 0.85,
                      shadowRadius: 5,
                      shadowOffset: {width: 0, height: 4},
                    }]}>
                      <Image source={item.image} resizeMode='contain' style={{
                        //borderRadius: Metrics.curve,
                        aspectRatio: 1,
                        width: undefined,
                        height: undefined,
                      }}/>
                    </View>

                    {/* info */}
                    <View style={{
                      flex: 2,
                      paddingHorizontal: Metrics.pad,
                    }}>

                      {
                        this.state.fontLoaded ? (
                          <Text style={{
                            fontSize: Metrics.font3,
                            fontFamily: 'lato-black',
                          }}> {item.name} </Text>
                        ) : null
                      }
                      {
                        this.state.fontLoaded ? (
                          <Text style={{
                            fontFamily: 'lato-regular',
                            color: Colors.gray3,
                            fontSize: Metrics.font5,
                            paddingTop: 3,
                            paddingBottom: 4,
                          }}> {item.cuisine} </Text>
                        ) : null
                      }
                      {
                        this.state.fontLoaded ? (
                          <Text style={{
                            fontFamily: 'lato-regular',
                            flexWrap: 'wrap',
                            textAlign: 'left',
                            fontSize: Metrics.font5,
                          }}> {item.description} </Text>
                        ) : null
                      }
                    </View>

                  </View>

                  {/* address, time*/}
                  <View style={{
                    paddingTop: Metrics.pad,
                  }}>

                    {
                      this.state.fontLoaded ? (
                        <Text style={{
                          fontFamily: 'lato-bold',
                          flexWrap: 'wrap',
                        }}>{item.time}</Text>
                      ) : null
                    }


                    {
                      this.state.fontLoaded ? (
                        <Text style={{
                          fontFamily: 'lato-regular',
                          flexWrap: 'wrap',
                        }}>{item.address}</Text>
                      ) : null
                    }
                  </View>

                </View>


                {/* fake button column)*/}
                  <View style={{
                    width: Metrics.padSmall / 2,
                  }}>
                  </View>

                {/* button column)*/}
                <View style={{
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                }}>

                <Button
                  buttonStyle={
                    this.state.starArray[profilesList.indexOf(item)]
                      ? [styles.circleButton, styles.glow, style={backgroundColor: Colors.yellow}]
                      : [styles.circleButton, style={
                        backgroundColor: Colors.gray5,
                        borderWidth: 1,
                        borderColor: Colors.gray6
                      }]
                  }
                  containerStyle={[styles.buttonContainer, style={backgroundColor: Colors.yellow}]}
                  titleStyle={{
                    color: Colors.white,
                  }}
                  onPress={() => this.toggleArray(item)}
                  title=''
                  icon={
                    <FontAwesome
                      name='star'
                      size={Metrics.button/2}
                      color= {Colors.white}
                    />
                  }
                />

                  {/* for spacing between buttons in button column */}
                  <View style={{
                    height: Metrics.pad / 2,
                  }}>
                  </View>

                  <Button
                    onPress={() => console.log('should run this.goToTruck')}
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

                  {/* for spacing between buttons in button column */}
                  <View style={{
                    height: Metrics.pad / 2,
                  }}>
                  </View>

                  <Button
                    onPress={() => this.toggleRemindArray(item)}
                    buttonStyle={
                      ((this.state.remindArray[profilesList.indexOf(item)]) && (this.state.remindArray[profilesList.indexOf(item)].localeCompare('None') !== 0))
                        ? [styles.circleButton, style={backgroundColor: Colors.blue}]
                        : [styles.circleButton, style={
                          backgroundColor: Colors.gray5,
                          borderWidth: 1,
                          borderColor: Colors.gray6,
                        }]
                    }
                    containerStyle={[styles.buttonContainer, style={backgroundColor: Colors.blue}]}
                    titleStyle={{
                      color: Colors.white,
                      fontSize: Metrics.font4,
                    }}
                    title=''
                    icon={
                      <MaterialCommunityIcons
                        name='bell'
                        size={18}
                        color='white'
                      />
                    }
                  />
                </View>

              </View>
            }
              renderSectionHeader={({section: {title}}) => (
                <View style={[styles.shadowSmall, styles.sectionHead]}>

                  {
                    this.state.fontLoaded ? (
                      <Text style={{
                        fontFamily: 'lato-bold',
                        color: Colors.gray1,
                        letterSpacing: 1,
                        fontSize: Metrics.font5
                      }}>{title}</Text>
                    ) : null
                  }
                </View>
              )}
              sections={[
                {title: 'FRIDAY', data: [profilesList[5]]},
                {title: 'SATURDAY', data: [profilesList[6], profilesList[1], profilesList[2]]},
                {title: 'SUNDAY', data: [profilesList[0], profilesList[3]]},
                {title: 'MONDAY', data: [profilesList[4], profilesList[6]]},
              ]}
              keyExtractor={(item, index) => item + index}
            />

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
    color: Colors.gray1,
    fontSize: Metrics.font3,
    paddingBottom: Metrics.pad / 2,
    fontFamily: 'lato-bold',
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

  sectionHead: {
    backgroundColor: Colors.white,
    height: Metrics.button,
    justifyContent: 'center',
    paddingHorizontal: Metrics.pad,
  },

  listItem: {
    paddingVertical: Metrics.pad * 1.25,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: Colors.white,

    borderColor: Colors.gray6,
    borderBottomWidth: 1,
    paddingHorizontal: Metrics.pad * 1.25,
  },

  info: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
  },

  shadow: {
    shadowColor: Colors.black,
    shadowOpacity: Metrics.glow / 2,
    shadowRadius: 20,
    shadowOffset: {width: 0, height: 4}
  },

  shadowSmall: {
    shadowColor: Colors.black,
    shadowOpacity: Metrics.glow / 10,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 4},
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


  overlayContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    backgroundColor: Colors.inactive,
    alignItems: 'center',

    zIndex: 1,
  },

  overlay: {
    flex: 0.11,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: Colors.white,
    padding: Metrics.pad * 1.25,
    paddingBottom: Metrics.nav * 1.5,

  },

  nav: {
    height: Metrics.nav,
    backgroundColor: Colors.purple,
  },


});
