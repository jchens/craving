import React, { Component } from 'react'
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  Image,
} from 'react-native';
import MapView, { Marker, Callout, ProviderPropType } from 'react-native-maps';
import flagImg from '../Images/Icons/icons_pin_orange.png';
import Colors from '../Themes/Colors.js'

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;

export default class HomeMap extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
    };
  }

  onMarkerClick() {
    this.map.fitToCoordinates([e.nativeEvent.coordinate, e.nativeEvent.coordinate], {
      edgePadding: { top: 100, right: 100, bottom: 100, left: 100 },
      animated: true,
    })
  }


  render() {

    return (

      <View style={styles.container}>
        <MapView
          provider={this.props.provider}
          style={styles.map}
          initialRegion={this.state.region}
          onPress={this.onMapPress}
          loadingEnabled
          loadingIndicatorColor="#666666"
          loadingBackgroundColor="#eeeeee"
        >
          <Marker
            onPress={e => this.onMarkerClick(e)}
            coordinate={{
              latitude: LATITUDE + SPACE,
              longitude: LONGITUDE + SPACE,
            }}
            identifier = {"Los Tolucas"}
            anchor={{ x: 0.5, y: 1 }}
          >
          <Image source={require('../Images/Icons/icons_pin_orange.png')} style={{ width: 40, height: 40 }} />
          </Marker>

          <Marker
            onPress={e => this.onMarkerClick(e)}
            coordinate={{
              latitude: LATITUDE - SPACE,
              longitude: LONGITUDE - SPACE,
            }}
            identifier = {"Twister"}
            anchor={{ x: 0.5, y: 1 }}
          >
            <Callout>
              <View>
                <Text>This is a plain view</Text>
              </View>
            </Callout>
            <Image source={require('../Images/Icons/icons_pin_orange.png')} style={{ width: 40, height: 40 }} />
          </Marker>
        </MapView>

        <View style={styles.card}>
        </View>
      </View>
    );
  }
}

HomeMap.propTypes = {
  provider: ProviderPropType,
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'stretch',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  card: {
    flex: 0.25,
    flexDirection: 'row',
    backgroundColor: Colors.white,
    padding: 20,
  },
  text: {
    width: 200,
    marginLeft: 30,
    marginRight: 30,

  },
  name: {
    fontFamily: 'Helvetica',
    fontSize: 24,
    color: Colors.gray1,

  },
  cuisine: {
    fontFamily: 'Helvetica',
    fontSize: 14,
    color: Colors.gray4,
  },
  description: {
    fontFamily: 'Helvetica',
    fontSize: 14,
    color: Colors.gray3,
    flexWrap: 'wrap',
    backgroundColor: 'yellow'
  },

});
