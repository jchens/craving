]import React, { Component } from 'react'
import PropTypes from 'prop-types' //consider using this!
import { StyleSheet, SafeAreaView, View, FlatList, Text, Linking, ActivityIndicator, TouchableOpacity, Image } from 'react-native'

import {profilesList} from '../Themes/Profiles.js'

export default class Tracking extends Component {
  constructor() {
    super();
    let arr = []
    for(let i = 0; i < 7; i++) {
      arr.push(false);
    }
    this.state = {
      fav: arr,
    };
  }

  updatedState = (key) => {
    console.log("im here");
    console.log(key);
    let temp = this.state.fav;
    temp[key] = !temp[key];
    console.log(temp);
    this.setState({
        fav: temp,
    })
  }


  render () {

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
                      <Image source={item.image} style={styles.image}/>
                      <View style={styles.text}>
                        <Text style={styles.name}> {item.name} </Text>
                        <Text style={styles.cuisine}> {item.cuisine} </Text>
                        <Text style={styles.description}> {item.description} </Text>

                        <View style={styles.bottom}>
                          <View style={styles.bottom_button_left}>
                            <TouchableOpacity>
                              <Text style={styles.bottom_text_left}> Find on Map </Text>
                            </TouchableOpacity>
                          </View>


                          <View style={styles.bottom_button_right}>
                            <TouchableOpacity>
                              <Text style={styles.bottom_text_right}> Check In </Text>
                            </TouchableOpacity>
                          </View>
                        </View>


                      </View>


                      <View style={this.state.fav[item.key] ? styles.button_filled : styles.button}>
                        <TouchableOpacity onPress={() => this.updatedState(item.key)}>
                          <Image
                            style={this.state.fav[item.key] ? styles.star_filled : styles.star}
                            source={require('../Images/Icons/icons_star.png')}/>
                        </TouchableOpacity>
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
    color: '#0496FF',
  },
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
  text: {
    width: 200,
    marginLeft: 30,
    marginRight: 30,

  },
  name: {
    color: '#333333',

  },
  cuisine: {
    color: '#BDBDBD',
  },
  description: {
    color: '#828282',
    flexWrap: 'wrap',
    backgroundColor: 'yellow'
  },
  button: {
    backgroundColor: '#F2F2F2',
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
    width: 80,
    borderRadius: 40

  },
  star: {
    backgroundColor: '#F2F2F2',
    height: 50,
    width: 50,
  },
  button_filled: {
    backgroundColor: '#FFD046',
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
    width: 80,
    borderRadius: 40

  },
  star_filled: {
    backgroundColor: '#FFD046',
    height: 50,
    width: 50,
  },
  bottom: {
    flexDirection: 'row',
  },
  bottom_button_left: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: 140,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#FF4D00',
  },
  bottom_button_right: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: 140,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#0496FF',
  },
  bottom_text_left: {
    color: '#FF4D00',

  },
  bottom_text_right: {
    color: '#0496FF',

  }



});
