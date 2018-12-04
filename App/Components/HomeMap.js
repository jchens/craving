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
import { Images, Profiles, Dimesions } from '../Themes';
import Colors from '../Themes/Colors.js'
import markerImg from '../Images/Icons/icons_pin_orange.png';
import {profilesList} from '../Themes/Profiles.js'
import { material } from 'react-native-typography'
import { Feather, Ionicons } from '@expo/vector-icons';
import { Overlay } from 'react-native-elements';

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
      text: '',
      isVisible: true,
    };
  }

  // TODO: constantly submitting with onSubmitEditing??
  // also not able to move map now
  searchComplete = async (input) => {
    // case-insensitive
    if (input === 'taco') {
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

    });
  }

  toggleOverlay = () => {
    this.setState({
      isVisible: !this.state.isVisible,
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
          loadingEnabled={true}
        >
          {MARKERS.map((marker, i) => (
            <Marker
              key={i}
              identifier={i.toString()}
              coordinate={marker}
              onPress={e => this.onMarkerClick(parseInt(e.nativeEvent.id))}
              anchor={{ x: 0.5, y: 1 }}
            >
            <Image source={markerImg} style={{ width: 40, height: 40 }} />
            </Marker>
          ))}

          <View style={styles.searchContainer}>
            <View style={styles.searchBar}>

              <View style={styles.searchIcon} onPress={this.searchComplete(this.state.text)}>
                <Feather
                  name='search'
                  size={20}
                />
              </View>

              <TextInput
                onChangeText={(text) => this.setState({text})}
                value={this.state.text}
                clearButtonMode='while-editing'
                style={styles.searchInput}
                placeholder="I'm craving..."
                placeholderTextColor='#828282'
                onSubmitEditing={(text) => this.searchComplete}
                />

              <TouchableOpacity
                style={styles.changeTime}
                onPress={this.toggleOverlay}
              >
                <Text> Now </Text>
                  <Feather
                    name='clock'
                    size={20}
                  />
              </TouchableOpacity>

            </View>
          </View>

          <TouchableOpacity
            onPress={this.fitAllMarkers}
            style={styles.button}
          >
            <Feather
              name='zoom-out'
              size={20}
            />
          </TouchableOpacity>

        </MapView>

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

        <Overlay
          isVisible={this.state.isVisible}
          onBackdropPress={this.toggleOverlay}
          windowBackgroundColor='rgba(0,0,0,0.25)'
          containerStyle={styles.overlayContainer}
          overlayStyle={styles.overlay}
          fullScreen={true}
          >
          <Text>Set time to find trucks</Text>
          <TouchableOpacity
            onPress={this.toggleOverlay}
            style={styles.orangeButton}
          >
            <Text> Search </Text>
          </TouchableOpacity>
        </Overlay>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    //...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    flexDirection: 'column',
    //backgroundColor: 'white',
  },
  map: {
    //...StyleSheet.absoluteFillObject,
    flex: 10,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },

  button: {
    borderRadius: 40,
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.frosty,

    // to move right,
    left: width / 1.17,
    // to move up, increase
    top: height / 2.3,
  },

  searchContainer: {
    flex: 0.25,
    backgroundColor: Colors.frosty,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  searchBar: {
    flex: 0.8,
    height: 50,
    borderRadius: 30,
    paddingHorizontal: 15,

    backgroundColor: Colors.white,
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'center',

    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 20,

  },

  searchIcon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  searchInput: {
    flex: 7,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  changeTime: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',

    borderColor: Colors.gray5,
    borderLeftWidth: 1,

  },

  overlayContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    backgroundColor: Colors.inactive,
    alignItems: 'center',
  },

  overlay: {
    flex: 0.25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,

    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
  },

  card: {
    flex: 5,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: Colors.yellow,
    padding: 20,
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    backgroundColor: Colors.orange,
    padding: 0,
    //backgroundColor: Colors.blue,
  },
  image: {
    height: 100,
    width: 100,
    padding: 0,
    //backgroundColor: Colors.orange,
  },
  text: {
    width: 200,
    marginLeft: 30,
    marginRight: 30,
    padding: 0,
    //backgroundColor: Colors.yellow,

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

  orangeButton: {
    backgroundColor: Colors.orange,
    height: 50,
    borderRadius: 50,
    width: width,
    justifyContent: 'center',
    alignItems: 'center',

  }
});

export default FitToCoordinates;
