import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Images, Profiles } from '../Themes';
import Colors from '../Themes/Colors.js'
import markerImg from '../Images/Icons/icons_pin_orange.png';
import {profilesList} from '../Themes/Profiles.js'
import { material } from 'react-native-typography'

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
    latitude: profilesList[modifier].latitude,
    longitude: profilesList[modifier].longitude,
  };
}

const MARKERS = [
  createMarker(),
  createMarker(2),
  createMarker(3),
  createMarker(4),
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
    };
  }


  fitAllMarkers() {
    this.map.fitToCoordinates(MARKERS, {
      edgePadding: DEFAULT_PADDING,
      animated: true,
    });
  }
  onMarkerClick(e) {
    this.map.fitToCoordinates([e.nativeEvent.coordinate, e.nativeEvent.coordinate], {
      animated: true,
    });
    console.log(e.nativeEvent);
    var index = (parseInt(e.nativeEvent.id));

    this.setState({
      name: profilesList[index].name,
      cuisine: profilesList[index].cuisine,
      description: profilesList[index].description,
      image: profilesList[index].image,

    });
  }

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
        >
          {MARKERS.map((marker, i) => (
            <Marker
              key={i}
              identifier={i.toString()}
              coordinate={marker}
              onPress={e => this.onMarkerClick(e)}
              anchor={{ x: 0.5, y: 1 }}
            >
            <Image source={markerImg} style={{ width: 40, height: 40 }} />
            </Marker>
          ))}
        </MapView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => this.fitAllMarkers()}
            style={[styles.bubble, styles.button]}
          >
            <Text>View all markers</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.card}>
          <View style={styles.info}>

            <Image source={this.state.image} style={styles.image}/>

            <View style={styles.text}>
              <Text style={material.title}> {this.state.name} </Text>
              <Text style={material.caption}> {this.state.cuisine} </Text>
              <Text style={material.body1}> {this.state.description} </Text>
            </View>
          </View>

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'stretch',
    flexDirection: 'column',
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
  button: {
    marginTop: 12,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'column',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
  card: {
    flex: 0.3,
    flexDirection: 'column',
    backgroundColor: Colors.white,
    padding: 40,
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    padding: 20,
    backgroundColor: Colors.blue,
  },
  image: {
    height: 100,
    width: 100,
    padding: 0,
    backgroundColor: Colors.orange,
  },
  text: {
    width: 200,
    marginLeft: 30,
    marginRight: 30,
    backgroundColor: Colors.yellow,

  },
  name: {
    color: Colors.gray1,

  },
  cuisine: {
    color: Colors.gray4,
  },
  description: {
    color: Colors.gray3,
    flexWrap: 'wrap',
    backgroundColor: 'white'
  },
});

export default FitToCoordinates;
