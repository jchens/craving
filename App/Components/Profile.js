import React, { Component } from 'react'
import PropTypes from 'prop-types' //consider using this!
import { StyleSheet, SafeAreaView, View, FlatList, Text, Linking, ActivityIndicator, TouchableOpacity, Image } from 'react-native'
import { Metrics, Colors, Images } from '../Themes'
import {profilesList} from '../Themes/Profiles.js'

import { material } from 'react-native-typography'
import { Feather, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { Overlay, Button } from 'react-native-elements';

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

            <View style={styles.titleContainer}>
              <Text style={styles.title}> Visted</Text>
            </View>

            <View style={styles.listContainer}>

              <FlatList
                data={profilesList}
                keyExtractor= {(item) => item.name}
                renderItem={({item}) =>

                <View style={[styles.listItem]}>

                  {/* day you visited*/}
                  <Text style={{
                    color: Colors.blue,
                    paddingHorizontal: Metrics.pad,
                  }}> {item.visit} </Text>

                  {/* info: holding photo, info, and star*/}
                  <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    alignItems: 'flex-start',
                    paddingHorizontal: Metrics.pad * 1.5,
                    paddingVertical: Metrics.padSmall,
                  }}>


                    {/* view to hold image for shadow*/}
                    <View style={{
                      shadowColor: Colors.black,
                      shadowOffset: { width: 0, height: 4 },
                      shadowOpacity: Metrics.shadow,
                      shadowRadius: 10,
                    }}>
                      <Image source={item.image} resizeMode='contain' style={{
                        borderRadius: Metrics.curve,

                        width: 40,
                        height: 40,
                      }}/>
                    </View>

                    <View style={{
                      flex: 2,
                      paddingHorizontal: Metrics.padSmall,
                      // width: 200,
                      // marginLeft: 30,
                      // marginRight: 30,
                    }}>
                      <Text style={material.title}> {item.name} </Text>
                      <Text style={material.caption}> {item.cuisine} </Text>
                      <Text style={{
                        color: Colors.gray3,
                        flexWrap: 'wrap',
                        textAlign: 'left',
                        fontSize: Metrics.fontSmall,
                        paddingTop: Metrics.pad / 2 ,
                      }}> {item.description} </Text>
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

                  {/* buttonRow */}
                  <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    paddingTop: 5,
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
                        onPress={console.log('should run this.goToTruck')}
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
    backgroundColor: Colors.white,
  },
  title: {
    color: Colors.gray1,
    fontSize: 36,
  },
  titleContainer: {
    flex: 1,
    color: Colors.blue,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },

  listContainer: {
    flex: 7,
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',

    // TODO: change this to reveal some cool illustration
    backgroundColor: Colors.purple,
  },

  listItem: {
    paddingTop: Metrics.pad * 1.5,
    paddingBottom: Metrics.padBig,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    backgroundColor: Colors.white,

    borderColor: Colors.gray5,
    borderBottomWidth: 1,
  },
  shadow: {
    shadowColor: Colors.black,
    shadowOpacity: Metrics.glow / 4,
    shadowRadius: 20,
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

  button: {
    borderRadius: Metrics.button,
    height: Metrics.button,
    paddingLeft: Metrics.button / 2,
    paddingRight: Metrics.pad,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonContainer: {
    borderRadius: Metrics.button,
  },

  star: {
    backgroundColor: Colors.gray6,
    height: 50,
    width: 50,
  },
  button_filled: {
    backgroundColor: Colors.yellow,
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
    width: 80,
    borderRadius: 40

  },
  star_filled: {
    backgroundColor: Colors.yellow,
    height: 50,
    width: 50,
  },
  bottom: {
    flexDirection: 'row',
  },
  bottom_button_left: {
    backgroundColor: '#FF4D00',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: 120,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#FF4D00',
    marginRight: 10,
    marginTop: 20,
  },
  bottom_button_right: {
    backgroundColor: '#0496FF',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: 120,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#0496FF',
    marginTop: 20,
  },
  bottom_text_left: {
    color: Colors.orange,

  },
  bottom_text_right: {
    color: Colors.blue,

  }



});
