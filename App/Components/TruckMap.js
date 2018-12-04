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
import markerImg from '../Images/Icons/icons_pin_orange.png';
import {profilesList} from '../Themes/Profiles.js'
import { material } from 'react-native-typography'
import { Feather, Ionicons } from '@expo/vector-icons';

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
      text: 'Search',
    };
  }


  fitAllMarkers() {
    // this.map.fitToCoordinates(MARKERS, {
    //   animated: true,
    // });
    this.map.fitToSuppliedMarkers(['1', '2', '3', '4'], {
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
          loadingEnabled={true}
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

          <View style={styles.searchContainer}>
            <View style={styles.searchBar}>

              <View style={styles.searchIcon}>
                <Feather
                  name='search'
                  size={20}
                />
              </View>

              <TextInput
                onChangeText={(text) => this.setState({text})}
                value={this.state.text}
                style={styles.searchInput}
                />

              <TouchableOpacity style={styles.changeTime}>
                <Text> Now </Text>
                  <Feather
                    name='clock'
                    size={20}
                  />
              </TouchableOpacity>

            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => this.fitAllMarkers()}
              style={styles.button}
            >
              <Feather
                name='zoom-out'
                size={20}
              />
            </TouchableOpacity>
          </View>

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
    justifyContent: 'flex-start',
    //alignItems: 'flex-end',
  },

  button: {
    borderRadius: 40,
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.frosty,
  },
  buttonContainer: {
    flex: 3,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 20,
  },
  searchContainer: {
    flex: 1,
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
    shadowOpacity: 0.1,
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

  card: {
    flex: 4,
    flexDirection: 'column',
    backgroundColor: Colors.frosty,
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    padding: 20,
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
});

export default FitToCoordinates;
