import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet,
  View,
  Button,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Dimensions,
  ScrollView} from 'react-native'
import { material } from 'react-native-typography'
import { FontAwesome } from '@expo/vector-icons';
import { Metrics, Colors } from '../Themes'
import { MapView, Marker } from 'react-native-maps';



export default class Map extends Component {

  constructor(props) {
    super(props);
  }

  state = {
    markers
  }


  getInitialState() {
    return {
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
    };
  }

  onRegionChange(region) {
    this.setState({ region });
  }

  render() {
    return (

      <MapView
        region={this.state.region}
        onRegionChange={this.onRegionChange}
      >
      </MapView>
    );
  }
}


const styles = StyleSheet.create({

  search: {
    flexDirection: 'row',
    backgroundColor: Colors.snow,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
  },

  search_bar: {
    height: 50,
    flex: 0.9,
    flexDirection: 'row',
    backgroundColor: Colors.silver,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },

  input: {
    width: Dimensions.get('window').width - 100,
    color: Colors.charcoal,
  },

  search_icon: {
    height: 30,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
