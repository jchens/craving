import React, { Component } from 'react'
import PropTypes from 'prop-types' //consider using this!
import { StyleSheet, SafeAreaView, View, FlatList, SectionList,
  Text, Linking, ActivityIndicator, TouchableOpacity, Image } from 'react-native'
import { Metrics, Colors, Images } from '../Themes'
import {profilesList} from '../Themes/Profiles.js'

import { material } from 'react-native-typography'
import { Feather, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { Overlay, Button } from 'react-native-elements';

export default class Visited extends Component {
  constructor() {
    super();
    let arr = []
    for(let i = 0; i < 7; i++) {
      arr.push(false);
    }

    let listData = [];
    for(let i = 0; i < 7; i++) {
      listData.push({title: profilesList[i].visit, data: [profilesList[i]]});
    }

    this.state = {
      fav: arr,
      sectionListData: listData,
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
              <Text style={styles.title}>{'Visited'}</Text>
            </View>

            <View style={styles.listContainer}>

              {/* flatlist */}
              <SectionList
                renderItem={({item}) =>

                <View style={[styles.listItem]}>

                  {/* info: holding photo, info, and star*/}
                  <View style={styles.info}>


                    {/* view to hold image for shadow*/}
                    <View style={[styles.shadowSmall, style={
                      flex: 1,
                    }]}>
                      <Image source={item.image} resizeMode='cover' style={{
                        borderRadius: Metrics.curve,
                        aspectRatio: 1,
                        width: undefined,
                        height: undefined,
                      }}/>
                    </View>

                    {/* info */}
                    <View style={{
                      flex: 2,
                      paddingHorizontal: Metrics.padSmall,
                    }}>
                      <Text style={{
                        fontSize: Metrics.font3,
                      }}> {item.name} </Text>
                      <Text style={{
                        color: Colors.gray3,
                        fontSize: Metrics.font5,
                        paddingVertical: 5
                      }}> {item.cuisine} </Text>
                      <Text style={{
                        flexWrap: 'wrap',
                        textAlign: 'left',
                        fontSize: Metrics.font5,
                      }}> {item.description} </Text>
                    </View>


                    <Button
                      buttonStyle={[styles.circleButton, styles.glow, style={backgroundColor: Colors.yellow}]}
                      containerStyle={[styles.buttonContainer, style={backgroundColor: Colors.yellow}]}
                      titleStyle={{
                        color: Colors.white,
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

                </View>

                }
                renderSectionHeader={({section: {title}}) => (
                  <View style={[styles.shadowSmall, style={
                    backgroundColor: Colors.white,
                    height: Metrics.button,
                    justifyContent: 'center',
                    paddingHorizontal: Metrics.pad,

                    shadowColor: Colors.black,
                    shadowOpacity: Metrics.shadow / 2,
                    shadowRadius: 5,
                    shadowOffset: {width: 0, height: 0},
                  }]}>
                    <Text style={{
                      fontWeight: 'bold',
                      color: Colors.gray1,
                    }}>{title}</Text>
                  </View>
                )}

                sections={this.state.sectionListData}
                keyExtractor={(item, index) => item + index}
              />

              {/* bottom nav */}
              <View style={[styles.nav, styles.shadow]}>
              </View>

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

  titleContainer: {
    height: Metrics.nav * 1.25,
    backgroundColor: Colors.gray7,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',

    borderBottomWidth: 1,
    borderColor: Colors.gray5,
  },

  title: {
    color: Colors.black,
    fontSize: Metrics.font3,
    paddingBottom: Metrics.pad / 2,
  },


    listContainer: {
      flex: 1,
      backgroundColor: 'white',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'stretch',

      // TODO: change this to reveal some cool illustration
      backgroundColor: Colors.purple,
    },

    listItem: {
      paddingVertical: Metrics.pad * 1.25,
      flexDirection: 'column',
      justifyContent: 'space-evenly',
      backgroundColor: Colors.white,

      borderColor: Colors.gray6,
      borderBottomWidth: 1,
    },

    info: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'flex-start',
      paddingHorizontal: Metrics.pad * 1.5,

      backgroundColor: Colors.white,
    },

    shadow: {
      shadowColor: Colors.black,
      shadowOpacity: Metrics.glow / 4,
      shadowRadius: 20,
      shadowOffset: {width: 0, height: 4}
    },

    shadowSmall: {
      shadowColor: Colors.black,
      shadowOpacity: Metrics.shadow / 2,
      shadowRadius: 5,
      shadowOffset: {width: 0, height: 2},
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
    paddingRight: Metrics.button / 4,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonContainer: {
    borderRadius: Metrics.button,
  },

  button_filled: {
    backgroundColor: Colors.yellow,
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
    width: 80,
    borderRadius: 40
  },

  nav: {
    height: Metrics.nav,
    backgroundColor: Colors.purple,
  },


});
