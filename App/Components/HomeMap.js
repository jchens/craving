import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Text,
  Image,
  TextInput,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Images, Profiles } from '../Themes';
import Colors from '../Themes/Colors.js'
import Metrics from '../Themes/Metrics.js'
import markerImg from '../Images/Icons/icons_pin_orange.png';
import {profilesList} from '../Themes/Profiles.js'
import { material } from 'react-native-typography'
import { Feather, MaterialIcons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { Overlay, Button } from 'react-native-elements';
import DateTimePicker from 'react-native-modal-datetime-picker';

import { Font } from 'expo';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 37.4275;
const LONGITUDE = -122.1697;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;




function createMarker(modifier = 1) {
  return {
    latitude: profilesList[modifier - 1].latitude,
    longitude: profilesList[modifier - 1].longitude,
  };
}

const MARKERS = [
  createMarker(),
  createMarker(2),
  createMarker(3),
  createMarker(4),
  createMarker(5),
  createMarker(6),
  createMarker(7),
];

const DEFAULT_PADDING = { top: 400, right: 400, bottom: 400, left: 400 };

class FitToCoordinates extends React.Component {
  constructor(props) {
    super(props);

    let arr = []
    for(let i = 0; i < 7; i++) {
      arr.push(false);
    }
    let remind = []
    for(let i = 0; i < 7; i++) {
      remind.push('None');
    }

    this.state = {
      starArray: arr,
      remindArray: remind,
      activeReminderIndex: 0,

      profile: profilesList[0],

      text: '',
      isTimeOverlayVisible: false,
      isReminderOverlayVisible: false,

      isDateTimePickerVisible: false,
      timeToSearch: 'Now',
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

  // TODO: constantly submitting with onSubmitEditing??
  // also not able to move map now
  searchComplete = () => {
    // case-insensitive
    if (this.state.text === 'taco') {
      console.log(input)
      this.onMarkerClick(0)
    }
  }

  fitAllMarkers = () => {
    // this.map.fitToCoordinates(MARKERS, {
    //   animated: true,
    // });
    this.map.fitToSuppliedMarkers(['1', '2', '3', '4', '5', '6', '7'], {
      animated: true,
    });
  }

  onMarkerClick(index) {
    // input = index at profiles list
    console.log(index);
    console.log(profilesList[index].name);
    this.map.fitToCoordinates([
      {
        latitude: profilesList[index].latitude,
        longitude: profilesList[index].longitude,
      }
    ], {
      animated: true,
    });

    this.setState({
      profile: profilesList[index]
    });
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
        isReminderOverlayVisible: !this.state.isReminderOverlayVisible,
    })

    console.log('overlay visibility set to: ' + this.state.isReminderOverlayVisible);

  }

// TODO: fix functionality
  goToTruck = () => {
    // openMap({ latitude: this.state.latitude, longitude: this.state.longitude });
    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
    const latLng = `${this.state.profile.latitude},${this.state.profile.longitude}`;
    const label = 'Food Truck';
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`
    });
    Linking.openURL(url);
  }

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleTimePicked = (time) => {
    console.log('A time has been picked: ', time.toLocaleTimeString());
    this._hideDateTimePicker();
    this.setState({
      timeToSearch: time.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'})
    });
  };

  _handleReminderPicked = (time) => {
    console.log('A reminder time has been picked: ', time.toLocaleTimeString());

    let temp = this.state.remindArray;
    temp[this.state.activeReminderIndex] = time.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'});
    this.setState({
        remindArray: temp,
        isReminderOverlayVisible: !this.state.isReminderOverlayVisible,
    })
    console.log('A time has been picked: ', this.state.remindArray[this.state.activeReminderIndex]);

    this._hideDateTimePicker();
  };

  render() {
    return (
      <View style={styles.container}>
        <MapView
          ref={ref => { this.map = ref; }}
          style={styles.map}
          initialRegion={{
            latitude: LATITUDE,
            longitude: LONGITUDE,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
          loadingEnabled={true}
          showsUserLocation={true}
        >
          {MARKERS.map((marker, i) => (
            <Marker
              key={i}
              identifier={i.toString()}
              coordinate={marker}
              onPress={e => this.onMarkerClick(parseInt(e.nativeEvent.id))}
              anchor={{ x: 0.5, y: 1 }}
            >
              <Image source={markerImg} style={{width: 40, height: 40 }} />
            </Marker>
          ))}
        </MapView>

        {/* Had to move these components out of the map */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>

            {/* search bar - text input */}
            <TextInput
              onChangeText={(text) => this.setState({text})}
              value={this.state.text}
              clearButtonMode='while-editing'
              style={{
                paddingHorizontal: Metrics.pad,
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,

              }}
              placeholder="I'm craving..."
              placeholderTextColor='#828282'
              onSubmitEditing={() => this.searchComplete}
              />

              {/* clock icon */}
              <Button
                buttonStyle={[styles.button, style={backgroundColor: Colors.gray6}]}
                containerStyle={{
                  backgroundColor: Colors.gray6,
                  borderTopRightRadius: Metrics.button,
                  borderBottomRightRadius: Metrics.button,
                  borderLeftWidth: 1,
                  borderColor: Colors.gray5
                }}
                titleStyle={{
                  color: Colors.gray3,
                  fontSize: Metrics.font4,
                }}
                title={this.state.timeToSearch}
                icon={
                  <Feather
                    name='clock'
                    size={20}
                    color={Colors.gray3}
                  />
                }
                onPress={() => this.setState({
                  isTimeOverlayVisible: !this.state.isTimeOverlayVisible,
                })}
              />

          </View>
        </View>

        <TouchableOpacity
          onPress={this.fitAllMarkers}
          style={styles.zoomButton}
        >
          <Feather
            name='zoom-out'
            size={Metrics.button / 2}
          />
        </TouchableOpacity>

        {/* TODO: overlapping w buttons for long descriptions */}
        <View style={[styles.card, styles.shadow]}>

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
                borderWidth: 4,
                borderColor: Colors.white,

                shadowColor: Colors.black,
                shadowOpacity: Metrics.shadow * 0.85,
                shadowRadius: 5,
                shadowOffset: {width: 0, height: 4},
              }]}>
                <Image source={this.state.profile.image} resizeMode='contain' style={{
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
                      fontFamily: 'lato-black',
                      fontSize: Metrics.font3,
                    }}> {this.state.profile.name} </Text>
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
                    }}> {this.state.profile.cuisine} </Text>
                  ) : null
                }

                {
                  this.state.fontLoaded ? (
                    <Text style={{
                      fontFamily: 'lato-regular',
                      flexWrap: 'wrap',
                      textAlign: 'left',
                      fontSize: Metrics.font5,
                    }}> {this.state.profile.description} </Text>
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
                  }}>{this.state.profile.time}</Text>
                ) : null
              }

              {
                this.state.fontLoaded ? (
                  <Text style={{
                    fontFamily: 'lato-regular',
                    flexWrap: 'wrap',
                  }}>{this.state.profile.address}</Text>
                ) : null
              }

            </View>

          </View>


          {/* fake button column)
            <View style={{
              width: Metrics.padSmall / 2,
            }}>
            </View>
          */}

          {/* button column)*/}
          <View style={{
            flexDirection: 'column',
            justifyContent: 'flex-start',
          }}>

          <Button
            buttonStyle={
              this.state.starArray[profilesList.indexOf(this.state.profile)]
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
            onPress={() => this.toggleArray(this.state.profile)}
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
              onPress={() => this.toggleRemindArray(this.state.profile)}
              buttonStyle={
                ((this.state.remindArray[profilesList.indexOf(this.state.profile)]) && (this.state.remindArray[profilesList.indexOf(this.state.profile)].localeCompare('None') !== 0))
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

        {/* Choose timeToSearch Overlay */}
        <Overlay
          isVisible={this.state.isTimeOverlayVisible}
          onBackdropPress={() => this.setState({
            isTimeOverlayVisible: !this.state.isTimeOverlayVisible,
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
                paddingBottom: Metrics.pad / 2,
              }}>Set when to find trucks</Text>
            ) : null
          }

          {/* Set time options*/}
          <DateTimePicker
            isVisible={this.state.isDateTimePickerVisible}
            onConfirm={this._handleTimePicked}
            onCancel={this._hideDateTimePicker}
            mode='datetime'
            titleIOS='Pick a time to find trucks'
          />



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
                    fontFamily: 'lato-regular',
                    paddingHorizontal: Metrics.pad,
                    color: Colors.orange,
                    fontSize: Metrics.font3,
                  }}>
                  {this.state.timeToSearch}
                </Text>
              ) : null
            }

            <Button
              onPress={this._showDateTimePicker}
              buttonStyle={[styles.button, style={backgroundColor: Colors.orange, paddingLeft: Metrics.pad}]}
              containerStyle={{
                backgroundColor: Colors.orange,
                borderTopRightRadius: Metrics.button,
                borderBottomRightRadius: Metrics.button,
              }}
              titleStyle={{
                color: Colors.white
              }}
              title=''
              icon={
                <Feather
                  name='edit'
                  size={20}
                  color={Colors.white}
                />
              }
            />
          </View>

        </Overlay>

        {/* Reminder Overlay */}
        <Overlay
          isVisible={this.state.isReminderOverlayVisible}
          onBackdropPress={() => this.setState({
            isReminderOverlayVisible: !this.state.isReminderOverlayVisible,
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
            onConfirm={this._handleReminderPicked}
            onCancel={this._hideDateTimePicker}
            mode='datetime'
            titleIOS='Pick a time to find trucks'
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
                    color={Colors.white}
                  />
                }
              />
            </View>
          </View>
        </Overlay>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'stretch',
    flexDirection: 'column',
    backgroundColor: Colors.orange,
  },
  map: {
    //...StyleSheet.absoluteFillObject,
    flex: 10,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },

  zoomButton: {
    position: 'absolute',
    top: '12%',
    borderRadius: Metrics.button,
    height: Metrics.button,
    width: Metrics.button + Metrics.pad/2,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },

  searchContainer: {
    position: 'absolute',
    top: 0,
    paddingTop: Metrics.pad * 2,
    width: '100%',
    //height: Metrics.button * 2,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    // backgroundColor: Colors.yellow

  },

  searchBar: {
    flex: 0.8,
    height: Metrics.button,
    borderRadius: 100,
    paddingLeft: Metrics.pad / 2,

    backgroundColor: Colors.white,
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'center',

    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: Metrics.glow / 4,
    shadowRadius: 20,
  },

  searchIcon: {
    flex: 2,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
  },

  searchInput: {
    flex: 3,
    paddingHorizontal: Metrics.pad,
    justifyContent: 'center',
    alignItems: 'center',
  },

  changeTime: {
    flex: 1,
    borderColor: Colors.gray5,
    borderLeftWidth: 1,
    backgroundColor: 'gray'
  },

  overlayContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    backgroundColor: Colors.inactive,
    alignItems: 'center',
  },

  overlay: {
    flex: 0.11,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: Colors.white,
    padding: Metrics.pad * 1.25,
    paddingBottom: Metrics.nav * 1.5,

  },

  card: {
    padding: Metrics.pad * 1.25,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: Colors.white,

    borderColor: Colors.gray6,
    borderBottomWidth: 1,

  },

  // Remove flex: 1 to make adaptable card
  info: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',

    paddingBottom: Metrics.smallPad,
  },

  shadow: {
    shadowColor: Colors.black,
    shadowOpacity: Metrics.glow / 2,
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
    shadowOpacity: Metrics.glow,
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

  nav: {
    flexDirection: 'row',
    height: Metrics.nav,
    backgroundColor: Colors.white,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },

});

export default FitToCoordinates;
