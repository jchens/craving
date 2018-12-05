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
import { Feather, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { Overlay, Button } from 'react-native-elements';
import DateTimePicker from 'react-native-modal-datetime-picker';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 37.4275;
const LONGITUDE = -122.1697;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;




function createMarker(modifier = 1) {
  return {
    // latitude: LATITUDE - (SPACE * modifier),
    // longitude: LONGITUDE - (SPACE * modifier),
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

    this.state = {
      name: profilesList[0].name,
      cuisine: profilesList[0].cuisine,
      description: profilesList[0].description,
      image: profilesList[0].image,
      latitude: profilesList[0].latitude,
      longitude: profilesList[0].longitude,
      text: '',
      isVisible: false,
      isDateTimePickerVisible: false,
      date: 'Now',
    };
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
      name: profilesList[index].name,
      cuisine: profilesList[index].cuisine,
      description: profilesList[index].description,
      image: profilesList[index].image,
      latitude: profilesList[index].latitude,
      longitude: profilesList[index].longitude,
    });
  }

  toggleOverlay = () => {
    this.setState({
      isVisible: !this.state.isVisible,
    });
  }

// TODO: fix functionality
  goToTruck = () => {
    // openMap({ latitude: this.state.latitude, longitude: this.state.longitude });
    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
    const latLng = `${this.state.latitude},${this.state.longitude}`;
    const label = 'Food Truck';
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`
    });
    Linking.openURL(url);
  }

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
    console.log('A time has been picked: ', date.toLocaleTimeString());
    this._hideDateTimePicker();
    this.setState({
      date: date.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'})
    });
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
                onSubmitEditing={this.searchComplete}
                />

                {/* clock icon */}
                <Button
                  buttonStyle={[styles.button, style={backgroundColor: Colors.white}]}
                  containerStyle={{
                    backgroundColor: Colors.white,
                    borderTopRightRadius: Metrics.button,
                    borderBottomRightRadius: Metrics.button,
                    borderLeftWidth: 1,
                    borderColor: Colors.gray5
                  }}
                  titleStyle={{
                    color: Colors.gray3,
                    fontSize: Metrics.fontSmall,
                  }}
                  title={this.state.date}
                  icon={
                    <Feather
                      name='clock'
                      size={20}
                      color='#828282'
                    />
                  }
                  onPress={this.toggleOverlay}
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

        </MapView>

        <View style={[styles.card, styles.shadow]}>

          {/* info: holding photo, info, and star*/}
          <View style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'flex-start',
            paddingHorizontal: Metrics.pad * 1.5,
          }}>

            {/* view to hold image for shadow*/}
            <View style={{
              shadowColor: Colors.black,
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: Metrics.shadow,
              shadowRadius: 10,
            }}>
              <Image source={this.state.image} resizeMode='contain' style={{
                flex: 1.25,
                aspectRatio: 1,
                borderRadius: Metrics.curve,

                width: 40,
                height: 40,
                //borderWidth: 4,
                borderColor: Colors.white,
              }}/>
            </View>

            <View style={{
              flex: 2,
              paddingHorizontal: Metrics.padSmall,
              // width: 200,
              // marginLeft: 30,
              // marginRight: 30,
            }}>
              <Text style={material.title}> {this.state.name} </Text>
              <Text style={material.caption}> {this.state.cuisine} </Text>
              <Text style={{
                color: Colors.gray3,
                flexWrap: 'wrap',
                textAlign: 'left',
                fontSize: Metrics.fontSmall,
                paddingTop: Metrics.pad / 2 ,
              }}> {this.state.description} </Text>
            </View>


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
          </View>

          <View style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',

            //backgroundColor: Colors.orange,
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
              <Text
                style={{
                  paddingHorizontal: Metrics.pad,
                  color: Colors.orange,
                  fontSize: Metrics.fontMed,
                }}>
                1.1 mi
              </Text>
              <Button
                onPress={this.goToTruck}
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
                  <MaterialIcons
                    name='directions-run'
                    size={20}
                    color='white'
                  />
                }
                iconRight
              />
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
                  color: Colors.white
                }}
                title='Profile'
                icon={
                  <Feather
                    name='truck'
                    size={20}
                    color='white'
                  />
                }
              />
            </View>

          </View>

        </View>

        <View style={[styles.nav, styles.shadow]}>
        </View>

        <Overlay
          isVisible={this.state.isVisible}
          onBackdropPress={this.toggleOverlay}
          windowBackgroundColor='rgba(0,0,0,0.25)'
          containerStyle={styles.overlayContainer}
          overlayStyle={[styles.overlay, styles.shadow]}
          fullScreen={true}
          >
          <Text style={{
            fontSize: Metrics.fontMed,
            textAlign: 'center',
          }}>Set time to find trucks</Text>

          {/* Set time options*/}
          <DateTimePicker
            isVisible={this.state.isDateTimePickerVisible}
            onConfirm={this._handleDatePicked}
            onCancel={this._hideDateTimePicker}
            mode='datetime'
            titleIOS='Pick a time to find trucks'
          />



          {/*TODO: will people try to click on time directly, not button?*/}
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            backgroundColor: Colors.white,
            borderColor: Colors.orange,
            borderWidth: 1,
            borderRadius: Metrics.button
          }}>

            <Text
              style={{
                paddingHorizontal: Metrics.pad,
                color: Colors.orange,
                fontSize: Metrics.fontMed,
              }}>
              {this.state.date}
            </Text>
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
                  color='white'
                />
              }
              iconRight
            />
          </View>


          {/*TODO: too visually heavy with 2 buttons? or stick w button conventions? */}
          <Button
            onPress={this.toggleOverlay}
            buttonStyle={[styles.circleButton, style={backgroundColor: Colors.blue}]}
            containerStyle={[styles.buttonContainer, style={backgroundColor: Colors.blue}]}
            titleStyle={{
              color: Colors.white
            }}
            title=''
            titleStyle={{
              fontSize: Metrics.fontMed,
            }}
            icon={
              <Feather
                name='search'
                size={20}
                color={Colors.white}
              />
            }
          />

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
    backgroundColor: 'blue',
  },
  map: {
    //...StyleSheet.absoluteFillObject,
    flex: 10,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: 'yellow'
  },

  zoomButton: {
    borderRadius: Metrics.button,
    height: Metrics.button + Metrics.pad/2,
    width: Metrics.button + Metrics.pad/2,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',

    // // to move right,
    // left: width / 1.17,
    // // to move up, increase
    // top: height / 2.3,
  },

  searchContainer: {
    paddingTop: Metrics.pad,
    flex: 0.25,
    backgroundColor: Colors.frosty,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
    shadowOpacity: Metrics.shadow,
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
    //flexDirection: 'row',
    borderColor: Colors.gray5,
    borderLeftWidth: 1,
    backgroundColor: 'gray'
    //alignItems: 'center',
    //justifyContent: 'center',
  },

  overlayContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    backgroundColor: Colors.inactive,
    alignItems: 'center',
  },

  overlay: {
    flex: 0.3,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },

  shadow: {
    shadowColor: Colors.black,
    shadowOpacity: Metrics.glow / 4,
    shadowRadius: 20,
  },

  card: {
    flex: 5,
    paddingTop: Metrics.pad * 1.5,
    paddingBottom: Metrics.pad * 0.5,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    backgroundColor: Colors.white,
  },

  button: {
    borderRadius: Metrics.button,
    height: Metrics.button,
    paddingLeft: Metrics.button / 2,
    paddingRight: Metrics.pad,
    justifyContent: 'center',
    alignItems: 'center',
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

  buttonContainer: {
    borderRadius: Metrics.button,
  },


  buttonRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },

  nav: {
    height: Metrics.button * 1,
    backgroundColor: Colors.purple,
  },

});

export default FitToCoordinates;
