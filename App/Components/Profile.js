import React, { Component } from 'react'
import PropTypes from 'prop-types' //consider using this!
import {
  StyleSheet,
  SafeAreaView,
  View,
  Dimensions,
  FlatList, SectionList,
  ScrollView,
  Text, Linking, ActivityIndicator, TouchableOpacity, Image } from 'react-native'
import { Metrics, Colors, Images } from '../Themes'
import {profilesList} from '../Themes/Profiles.js'

import { material } from 'react-native-typography'
import { Feather, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { Overlay, Button } from 'react-native-elements';

import Carousel from 'react-native-snap-carousel';
import { ENTRIES1 } from '../Themes/Pictures.js';

import MultipleTags from 'react-native-multiple-tags';



const { width, height } = Dimensions.get('window');

const tags = [
  'cherry',
  'mango',
  'cashew',
  'almond',
  'guava',
  'pineapple',
  'orange',
  'pear',
  'date',
  'strawberry',
  'pawpaw',
  'banana',
  'apple',
  'grape',
  'lemon',
];

const objectTags = [
  {
    key: 'id_01',
    value: 'cherry',
  },
  {
    key: 'id_02',
    value: 'mango',
  },
  {
    key: 'id_03',
    value: 'cashew',
  },
  {
    key: 'id_04',
    value: 'almond'
  },
  {
    key: 'id_05',
    value: 'guava'
  },
  {
    key: 'id_06',
    value: 'pineapple'
  },
  {
    key: 'id_07',
    value: 'orange'
  },
  {
    key: 'id_08',
    value: 'pear'
  },
  {
    key: 'id_09',
    value: 'date'
  }
]

const reviews = [
  {
      name: "Justine Robinson",
      icon: require('../Images/FTProfiles/trijeet.jpeg'),
      friend: true,
      date: "2 days ago",
      positiveTags: ["Great carnitas", "Friendly Staff"],
      negativeTags: ["Oily", "Long Line"]
  },
  {
      name: "Justine Robinson",
      icon: require('../Images/FTProfiles/trijeet.jpeg'),
      friend: true,
      date: "2 days ago",
      positiveTags: ["Great carnitas", "Friendly Staff"],
      negativeTags: ["Oily", "Long Line"]
  },
  {
      name: "Justine Robinson",
      icon: require('../Images/FTProfiles/trijeet.jpeg'),
      friend: true,
      date: "2 days ago",
      positiveTags: ["Great carnitas", "Friendly Staff"],
      negativeTags: ["Oily", "Long Line"]
  },
  {
      name: "Justine Robinson",
      icon: require('../Images/FTProfiles/trijeet.jpeg'),
      friend: true,
      date: "2 days ago",
      positiveTags: ["Great carnitas", "Friendly Staff"],
      negativeTags: ["Oily", "Long Line"]
  },
]



export default class Tracking extends Component {

  constructor(props) {
    super(props);
    this.state = {
      content: [],
      contentx: [],
    };
  }



  _renderItem ({item, index}) {
      return (
          <View style={styles.slide}>
            <Image source={item.illustration}/>
          </View>
      );
  }



  render () {

    return (
      <View style={styles.container}>
        <ScrollView>

          <Carousel
            data={ENTRIES1}
            renderItem={this._renderItem}
            sliderWidth={width}
            itemWidth={250}
            layout={'default'}
          />



          <Text> MOST POPULAR TAGS </Text>


          <View style={{
            flexDirection: 'row',
            flexWrap: 'wrap',

          }}>
            <Button
             title="LOADING BUTTON"
             buttonStyle={{
               backgroundColor: "rgba(92, 99,216, 1)",
               width: 150,
               height: 45,
               borderColor: "transparent",
               borderWidth: 0,
               borderRadius: 5
             }}
             containerStyle={{ marginTop: 20 }}
            />
            <Button
             title="LOADING BUTTON"
             buttonStyle={{
               backgroundColor: "rgba(92, 99,216, 1)",
               width: 150,
               height: 45,
               borderColor: "transparent",
               borderWidth: 0,
               borderRadius: 5
             }}
             containerStyle={{ marginTop: 20 }}
            />
            <Button
             title="LOADING BUTTON"
             buttonStyle={{
               backgroundColor: "rgba(92, 99,216, 1)",
               width: 150,
               height: 45,
               borderColor: "transparent",
               borderWidth: 0,
               borderRadius: 5
             }}
             containerStyle={{ marginTop: 20 }}
            />
            <Button
             title="LOADING BUTTON"
             buttonStyle={{
               backgroundColor: "rgba(92, 99,216, 1)",
               width: 150,
               height: 45,
               borderColor: "transparent",
               borderWidth: 0,
               borderRadius: 5
             }}
             containerStyle={{ marginTop: 20 }}
            />
          </View>

          <Text> ADD MY REVIEW </Text>


          <View>
            <MultipleTags
                tags={objectTags}
                search
                onChangeItem={(content) => { this.setState({ content }); }}
                title="Fruits"
              />
              {
              (() => this.state.content.map(item => <Text key={item.key}> {item.key}: {item.value} </Text>))()
              }
          </View>


          <Text> OTHER REVIEWS </Text>


          <View>
            <FlatList
              data={reviews}
              renderItem={({item}) =>  (
                  <Text>{item.name}</Text>
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
  tags: {
    backgroundColor: "rgba(92, 99,216, 1)",
    width: 150,
    height: 45,
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 5

  }
});
