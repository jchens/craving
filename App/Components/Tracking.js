import React, { Component } from 'react'
import PropTypes from 'prop-types' //consider using this!
import { StyleSheet, SafeAreaView, View, FlatList, Text, Linking, ActivityIndicator, TouchableOpacity, Image } from 'react-native'
import { Metrics, Colors } from '../Themes'

import {profilesList} from '../Themes/Profiles.js'

export default class Tracking extends Component {

  render () {

      console.log(profilesList)
      return (
        <View style={styles.container}>
            <Text style={styles.title}> Visted</Text>

            <View style={styles.list_container}>

              <FlatList
                data={profilesList}
                keyExtractor= {(item) => item.name}
                renderItem={({item}) =>

                  <View style={styles.list_item}>
                    <Text style={styles.visit}> {item.visit} </Text>

                    <View style={styles.info}>
                      <Image
                        source={item.image}
                        style={styles.image}
                        resizeMode="contain"/>
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

        </View>
      );

  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },

  title: {
    flex: 0.1,
    font-size: 24;
    fontFamily: 'PingFangHK-Medium',
    color: Colors.gray4,
  },

  list_container: {
    flex: 1,
    backgroundColor: 'blue',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },


  list_item: {
    flex: 0.5,
    backgroundColor: 'blue',
    paddingBottom: 20,
  },

  visit: {
    font-size: 14,
    color: Colors.blue,
    fontFamily: 'PingFangHK-Light',
  },

  // view to contain text
  info: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    padding: 20,

  },

  image: {
    height: 100,
    width: 100,
  },
  name: {
    font-size: 24;
    color: Colors.gray1,

  },
  cuisine: {
    font-size: 14;
    color: Colors.gray4,
  },
  description: {
    font-size: 14;
    color: Colors.gray3,
  },

});
