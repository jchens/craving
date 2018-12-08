import React, { Component } from 'react'
import PropTypes from 'prop-types' //consider using this!
import {
  StyleSheet, SafeAreaView,
  View, Dimensions,
  FlatList, SectionList,
  ScrollView, Text,
  Linking, ActivityIndicator,
  TouchableOpacity, Image,
  Platform, Keyboard } from 'react-native';
import { Metrics, Colors, Images } from '../Themes';
import {profilesList} from '../Themes/Profiles.js';
import EarnPoints from './EarnPoints.js';

import { material } from 'react-native-typography'
import { Feather, MaterialIcons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { Overlay, Button } from 'react-native-elements';
import { Font } from 'expo';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { NavigationActions } from 'react-navigation';

import Carousel from 'react-native-snap-carousel';
import { ENTRIES1 } from '../Themes/Pictures.js';

import MultipleTags from 'react-native-multiple-tags';
import AutoTags from 'react-native-tag-autocomplete';


const { width, height } = Dimensions.get('window');

const tags = [
  'Affordable',
  'Good food',
  'Small portions',
  'Long line',
  'Great carnitas',
  'Greasy',
  'Expensive',
  'Great tacos',
  'Short wait',
  'Great burritos',
  'Great tamales',
  'Friendly staff',
  'Tastes bland',
  'grape',
  'lemon',
];

const popularPositiveTags = ["Affordable", "Good food"];
const popularNegativeTags = ["Long line", "Small portions"];


const reviews = [
  {
      name: "Justine Robinson",
      icon: Images.stock1,
      friend: true,
      date: "2 days ago",
      positiveTags: ["Great carnitas", "Affordable"],
      negativeTags: ["Greasy", "Long line"]
  },
  {
      name: "Jerry Berry",
      icon: Images.stock2,
      friend: true,
      date: "2 days ago",
      positiveTags: ["Great tacos", "Friendly staff"],
      negativeTags: ["Long line", "Small portions"]
  },
  {
      name: "Thomas Hsieh",
      icon: Images.stock3,
      friend: false,
      date: "2 days ago",
      positiveTags: ["Short wait", "Friendly staff"],
      negativeTags: ["Greasy", "Tastes bland"]
  },
  {
      name: "Jessica Chen",
      icon: Images.stock4,
      friend: false,
      date: "2 days ago",
      positiveTags: ["Great carnitas", "Great tacos"],
      negativeTags: ["Long", "Small portions"]
  },
]

const item =   {
      name: "Justine Robinson",
      icon: Images.sanjeet_food_truck,
      friend: true,
      date: "2 days ago",
      positiveTags: ["Great carnitas", "Affordable"],
      negativeTags: ["Oily", "Long Line"]
  }

const truck = profilesList[0];


export default class Profile extends Component {

  constructor(props) {
    super(props);

    let arr = []
    for(let i = 0; i < 7; i++) {
      arr.push(true);
    }
    let remind = []
    for(let i = 0; i < 7; i++) {
      remind.push('None');
    }
    this.state = {
      content: [],

      starArray: arr,
      remindArray: remind,
      activeReminderIndex: 0,
      checkIns: [],

      isVisible: false,
      isDateTimePickerVisible: false,
      fontLoaded: false,
      sliderActiveSlide: 1,

      suggestions : [ {name:'Long line'}, {name:'Affordable'}, {name:'Friendly'}, {name:'Greasy'}, {name:'Good food'}, {name:'Small portions'}, {name:'Expensive'},],
      tagsSelected : []
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

  checkIn = (item) => {
    console.log(profilesList.indexOf(item));

    let temp = this.state.checkIns;

    var toggle = typeof temp[profilesList.indexOf(item)] == 'undefined';

    /* Only toggles the button color the first time the button is clicked. */
    if (toggle) {
      temp[profilesList.indexOf(item)] = true;
      this.setState({
        checkIns: temp,
      });
      this.child.toggleVisibility('checking in');
    }
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

  /* TODO: implement */
  _handleAddPhoto = () => {
    console.log('uploading photo');
    // If we can't get functionality, we can at least show the Earn Points overlay
    // this.setState({
    //   isEarnPointsVisible: !this.state.isEarnPointsVisible,
    //   uploadedPhoto: true,
    // });
    this.child.toggleVisibility('uploading a photo');
  };

  _renderItem ({item, index}) {
      return (
          <View style={styles.slide}>
            <Image style={{flex: 1, aspectRatio: 1, width: undefined, height: undefined, resizeMode: 'contain'}} source={item.illustration}/>
          </View>
      );
  }

  goToTruck = () => {
    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
    const latLng = `${this.state.profile.latitude},${this.state.profile.longitude}`;
    const label = 'Food Truck';
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`
    });
    console.log(url),
    Linking.openURL(url);
  }


  handleDelete = index => {
     let tagsSelected = this.state.tagsSelected;
     tagsSelected.splice(index, 1);
     this.setState({ tagsSelected });
  }

  handleAddition = suggestion => {
     this.setState({ tagsSelected: this.state.tagsSelected.concat([suggestion]) });
  }





  render () {
    return (
      <View style={styles.container}>


      <View style={styles.titleContainer}>
        {
          this.state.fontLoaded ? (
            <Text style={styles.title}>{'Profile'}</Text>
          ) : null
        }
      </View>

      {/* Earn Points overlay */}
      <EarnPoints ref={(child) => {this.child = child}} />

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


        {/* Not sure whether the contentContainerStyle is necessary. */}
        <ScrollView contentContainerStyle={{flexGrow: 1, justifyContent: 'center', alignItems: 'stretch'}}>

          {/* truck info header + check in button*/}
          <View style={[styles.listItem]}>

            {/* truck info header */}
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              backgroundColor: Colors.white,
            }}>

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
                    <Image source={truck.image} resizeMode='contain' style={{
                      flex: 1,
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
                        }}> {truck.name} </Text>
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
                        }}> {truck.cuisine} </Text>
                      ) : null
                    }
                    {
                      this.state.fontLoaded ? (
                        <Text style={{
                          fontFamily: 'lato-regular',
                          flexWrap: 'wrap',
                          textAlign: 'left',
                          fontSize: Metrics.font5,
                        }}> {truck.description} </Text>
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
                      }}>{truck.time}</Text>
                    ) : null
                  }


                  {
                    this.state.fontLoaded ? (
                      <Text style={{
                        fontFamily: 'lato-regular',
                        flexWrap: 'wrap',
                      }}>{truck.address}</Text>
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
                    this.state.starArray[profilesList.indexOf(truck)]
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
                  onPress={() => this.toggleArray(truck)}
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
                  // onPress={() => this.props.navigation.dispatch(
                  //   NavigationActions.navigate({routeName: 'HomeMap', params: {truck: profilesList.indexOf(truck)}})
                  // )}
                  onPress={() => this.goToTruck() }
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
                  onPress={() => this.toggleRemindArray(truck)}
                  buttonStyle={
                    ((this.state.remindArray[profilesList.indexOf(truck)]) && (this.state.remindArray[profilesList.indexOf(truck)].localeCompare('None') !== 0))
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

            <Button
              onPress={() => this.checkIn(truck)}
              buttonStyle={
                ((this.state.checkIns[profilesList.indexOf(truck)]) && (this.state.checkIns[profilesList.indexOf(truck)] !== 0))
                  ? [styles.button, style={
                    backgroundColor: Colors.white,
                    borderWidth: 1,
                    borderColor: Colors.gray6}]
                  // button = on
                  : [styles.button, style={backgroundColor: Colors.orange}]
              }
              containerStyle={[styles.buttonContainer, style={backgroundColor: Colors.gray5, marginTop: Metrics.marginVertical * 1.5}]}
              titleStyle={
                ((this.state.checkIns[profilesList.indexOf(truck)]) && (this.state.checkIns[profilesList.indexOf(truck)] !== 0))
                  ? {
                      color: Colors.gray6,
                      fontSize: Metrics.font4,
                      fontWeight: 'bold',
                    }
                  // button = on
                  : {
                    color: Colors.white,
                    fontSize: Metrics.font4,
                    fontWeight: 'bold',
                    }
              }
              title='Mark as visited'
              icon={
                <MaterialCommunityIcons
                  name='check-circle'
                  size={18}
                  color='white'
                />
              }
              disabled={((this.state.checkIns[profilesList.indexOf(truck)]) && (this.state.checkIns[profilesList.indexOf(truck)] !== 0))
                ? true : false
              }
            />
          </View>



          <View style={[styles.shadowSmall, styles.sectionHead]}>
            {
              this.state.fontLoaded ? (
                <Text style={{
                  fontFamily: 'lato-bold',
                  color: Colors.gray1,
                  letterSpacing: 1,
                  fontSize: Metrics.font5
                }}>PHOTOS</Text>
              ) : null
            }
            <Button
              onPress={ this._handleAddPhoto }
              buttonStyle={ [styles.circleButton, style={backgroundColor: 'rgba(0, 0, 0, 0)'}] }
              containerStyle={styles.buttonContainer}
              title=''
              icon={
                <Feather
                  name='plus'
                  size={20}
                  color={Colors.gray3}
                />
              }
            />
          </View>

          <Carousel
            data={ENTRIES1}
            renderItem={this._renderItem}
            sliderWidth={width}
            itemWidth={200}
            layout={'default'}
            enableMomentum={true}
                  activeSlideAlignment={'start'}
          />



          <View style={[styles.shadowSmall, styles.sectionHead]}>
            {
              this.state.fontLoaded ? (
                <Text style={{
                  fontFamily: 'lato-bold',
                  color: Colors.gray1,
                  letterSpacing: 1,
                  fontSize: Metrics.font5
                }}>MOST POPULAR TAGS</Text>
              ) : null
            }
          </View>

          {/* most popular tags!! */}
          <View style={{
            flexDirection: 'row',
            flex: 1,
            flexWrap: 'wrap',
            alignItems: 'center',
            padding: Metrics.pad * 1.25,
          }}>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              flexWrap: 'wrap',
              justifyContent: 'flex-start',
              paddingBottom: Metrics.pad / 2,
            }}>
              {
                popularPositiveTags.map(tag =>
                  <Button
                   key={tag}
                   title= {tag}
                   titleStyle={{
                       color: Colors.orange,
                       fontWeight: 'bold',
                   }}
                   buttonStyle={[styles.tag, style={
                     backgroundColor: Colors.orange_frosty,
                   }]}
                   containerStyle={styles.tagContainer}
                  />
                )
              }
            </View>

            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
              flexWrap: 'wrap',
            }}>
              {
                popularNegativeTags.map(tag =>
                  <Button
                   key={tag}
                   title= {tag}
                   titleStyle={{
                       color: Colors.gray1,
                       fontWeight: 'bold',
                   }}
                   buttonStyle={[styles.tag, style={
                     backgroundColor: Colors.gray6,
                   }]}
                   containerStyle={styles.tagContainer}
                  />
                )
              }
            </View>
          </View>

          <View style={[styles.shadowSmall, styles.sectionHead]}>
            {
              this.state.fontLoaded ? (
                <Text style={{
                  fontFamily: 'lato-bold',
                  color: Colors.gray1,
                  letterSpacing: 1,
                  fontSize: Metrics.font5
                }}>ADD MY REVIEW</Text>
              ) : null
            }
          </View>



          <View>
            <AutoTags
              suggestions={this.state.suggestions}
              tagsSelected={this.state.tagsSelected}
              handleAddition={this.handleAddition}
              handleDelete={this.handleDelete}
              placeholder="Add a tag..."
              renderTags={this.renderTags}
            />

          </View>

          <View style={[styles.shadowSmall, styles.sectionHead]}>
            {
              this.state.fontLoaded ? (
                <Text style={{
                  fontFamily: 'lato-bold',
                  color: Colors.gray1,
                  letterSpacing: 1,
                  fontSize: Metrics.font5
                }}>ALL REVIEWS</Text>
              ) : null
            }
          </View>
          <View>
            <FlatList
              data={reviews}
              renderItem={({item}) =>  (
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
                          shadowOpacity: Metrics.shadow * 0.75,
                          shadowRadius: 5,
                          shadowOffset: {width: 0, height: 4},
                        }]}>
                          <Image source={item.icon} resizeMode='contain' style={{
                            aspectRatio: 1,
                            width: undefined,
                            height: undefined,
                          }}/>
                        </View>

                        {/* info : name & date TODO: change to lato */}
                        <View style={{
                          flex: 2,
                          paddingHorizontal: Metrics.padSmall,
                        }}>
                          <Text style={{
                            fontSize: Metrics.font3,
                            fontFamily: 'lato-bold',
                          }}> {item.name} </Text>
                          <Text style={{
                            color: Colors.gray3,
                            fontSize: Metrics.font5,
                            fontFamily: 'lato-regular',
                            paddingVertical: 5
                          }}> {item.date} </Text>
                        </View>
                      </View>

                      {/* fake view for padding between info & tags lol */}
                      <View style={{
                        height: Metrics.pad,
                      }} />

                      {/* tags!! */}
                      <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        justifyContent: 'flex-start',
                      }}>
                        {
                          item.positiveTags.map(tag =>
                            <Button
                             key={tag}
                             title= {tag}
                             titleStyle={{
                                 color: Colors.orange,
                                 fontWeight: 'bold',
                             }}
                             buttonStyle={[styles.tag, style={
                               backgroundColor: Colors.orange_frosty,
                             }]}
                             containerStyle={styles.tagContainer}
                            />
                          )
                        }
                      </View>

                      {/* fake view for padding between tag lines lol */}
                      <View style={{
                        height: Metrics.pad / 2,
                      }} />

                      <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        flexWrap: 'wrap',
                      }}>
                        {
                          item.negativeTags.map(tag =>
                            <Button
                             key={tag}
                             title= {tag}
                             titleStyle={{
                                 color: Colors.gray1,
                                 fontWeight: 'bold',
                             }}
                             buttonStyle={[styles.tag, style={
                               backgroundColor: Colors.gray6,
                             }]}
                             containerStyle={styles.tagContainer}
                            />
                          )
                        }
                      </View>

                    </View>

                  </View>


                )
              }
            />
          </View>

        </ScrollView>
      </View>

    )
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

    zIndex: 1,
  },

  title: {
    color: Colors.gray1,
    fontSize: Metrics.font3,
    paddingBottom: Metrics.pad / 2,
    fontFamily: 'lato-bold',
    // marginTop: Platform.OS === 'ios' ? 28 : 38,

  },

  tags: {
    backgroundColor: "rgba(92, 99,216, 1)",
    width: 150,
    height: 45,
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 5
  },

  sectionHead: {
    backgroundColor: Colors.white,
    height: Metrics.button,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Metrics.pad,
    flexDirection: 'row',
    zIndex: 1,
  },

  listItem: {
    padding: Metrics.pad * 1.25,
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
  circleButton: {
    borderRadius: Metrics.button,
    height: Metrics.button,
    width: Metrics.button,
    justifyContent: 'center',
    alignItems: 'center',
  },

  tag: {
    borderRadius: Metrics.button / 4,
    height: Metrics.button,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Metrics.button/4,
  },

  tagContainer: {
    //backgroundColor: Colors.yellow,
    paddingRight: Metrics.pad/2,
  },
});
