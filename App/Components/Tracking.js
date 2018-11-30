import React, { Component } from 'react'
import PropTypes from 'prop-types' //consider using this!
import { StyleSheet, SafeAreaView, View, FlatList, Text, Linking, ActivityIndicator, TouchableOpacity, Image } from 'react-native'

import {profilesList} from '../Themes/Profiles.js'

export default class Tracking extends Component {

  render () {

      console.log(profilesList)
      return (
        <View style={styles.container}>
            <Text style={styles.title}> Visted</Text>
            <FlatList
              data={profilesList}
              keyExtractor= {(item) => item.name}
              renderItem={({item}) =>
                <View>
                  <Text style={styles.visit}> {item.visit} </Text>
                  <View style={styles.info}>
                    <Image source={item.image} style={styles.image}/>
                    <View>
                      <Text style={styles.name}> {item.name} </Text>
                      <Text style={styles.cuisine}> {item.cuisine} </Text>
                      <Text style={styles.description}> {item.description} </Text>
                    </View>
                  </View>
                </View>
              }
            />
        </View>
      );

  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    flex: 1,
    fontFamily: 'Roboto'
  },
  list: {
    flex: 9,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 15,
  },
  visit: {
    color: '#0496FF',
    fontFamily: 'Roboto'
  },
  info: {
    flexDirection: 'row',
  },
  image: {
    height: 100,
    width: 100,
  },
  name: {
    color: '#333333',

  },
  cuisine: {
    color: '#BDBDBD',
  },
  description: {
    color: '#828282',

  },



});
