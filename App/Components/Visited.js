import React, { Component } from 'react'
import PropTypes from 'prop-types' //consider using this!
import { StyleSheet, SafeAreaView, View, FlatList, SectionList,
  Text, Linking, ActivityIndicator, TouchableOpacity, Image } from 'react-native'
import { Metrics, Colors, Images } from '../Themes'
import {profilesList} from '../Themes/Profiles.js'

import { material } from 'react-native-typography'
import { Feather, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { Overlay, Button } from 'react-native-elements';
import { Font } from 'expo';

export default class Visited extends Component {
  constructor() {
    super();
    let arr = [];
    for(let i = 0; i < 7; i++) {
      arr.push(false);
    }

    let listData = [];
    for(let i = 0; i < 7; i++) {
      listData.push({title: profilesList[i].visit, data: [profilesList[i]]});
    }

    this.state = {
      starArray: arr,
      sectionListData: listData,
      fontLoaded: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      'lato-regular': require('../../assets/fonts/Lato-Regular.ttf'),
      'lato-bold': require('../../assets/fonts/Lato-Bold.ttf'),
      'lato-black': require('../../assets/fonts/Lato-Black.ttf'),
    });
    this.setState({ fontLoaded: true });
  }

  toggleArray = (item) => {
    console.log(profilesList.indexOf(item));

    let temp = this.state.starArray;
    temp[profilesList.indexOf(item)] = !temp[profilesList.indexOf(item)]
    this.setState({
        starArray: temp,
    })
  }


  render () {

    return (
        <View style={styles.container}>

            <View style={styles.titleContainer}>
              {
                this.state.fontLoaded ? (
                  <Text style={styles.title}>{'Visited'}</Text>
                ) : null
              }
            </View>

            <View style={styles.listContainer}>

              {/* flatlist */}
              <SectionList
                renderItem={({item, index}) =>

                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Profile')}
                >
                  <View style={[styles.listItem]}>

                    {/* info: holding photo, info, and star*/}
                    <View style={styles.info}>


                      {/* view to hold image for shadow*/}
                      <View style={[styles.shadowSmall, style={
                        flex: 1,
                        backgroundColor: Colors.white,
                        //borderRadius: Metrics.curve,
                        borderWidth: 4,
                        borderColor: Colors.white,

                        shadowColor: Colors.black,
                        shadowOpacity: Metrics.shadow * 0.85,
                        shadowRadius: 5,
                        shadowOffset: {width: 0, height: 4},
                      }]}>
                        <Image source={item.image} resizeMode='contain' style={{
                          //borderRadius: Metrics.curve,
                          aspectRatio: 1,
                          width: undefined,
                          height: undefined,
                        }}/>
                      </View>

                      {/* info */}
                      <View style={{
                        flex: 2,
                        paddingHorizontal: Metrics.pad,
                      }}>

                        {
                          this.state.fontLoaded ? (
                            <Text style={{
                              fontSize: Metrics.font3,
                              fontFamily: 'lato-black',
                            }}> {item.name} </Text>
                          ) : null
                        }
                        {
                          this.state.fontLoaded ? (
                            <Text style={{
                              fontFamily: 'lato-regular',
                              color: Colors.gray3,
                              fontSize: Metrics.font5,
                              paddingTop: 3,
                              paddingBottom: 4,
                            }}> {item.cuisine} </Text>
                          ) : null
                        }
                        {
                          this.state.fontLoaded ? (
                            <Text style={{
                              fontFamily: 'lato-regular',
                              flexWrap: 'wrap',
                              textAlign: 'left',
                              fontSize: Metrics.font5,
                            }}> {item.description} </Text>
                          ) : null
                        }
                      </View>



                      {/* buttom column */}
                      <View style={{
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                      }}>

                        <Button
                          key={index}
                          buttonStyle={
                            this.state.starArray[profilesList.indexOf(item)]
                              ? [styles.circleButton, styles.glow, style={backgroundColor: Colors.yellow}]
                              : [styles.circleButton, style={
                                backgroundColor: Colors.gray5,
                                borderWidth: 1,
                                borderColor: Colors.gray6
                              }]
                          }
                          containerStyle={[styles.buttonContainer, style={backgroundColor: Colors.yellow}]}
                          titleStyle={{
                            color: Colors.white,
                          }}
                          onPress={() => this.toggleArray(item)}
                          title=''
                          icon={
                            <FontAwesome
                              name='star'
                              size={Metrics.button/2}
                              color= {Colors.white}
                            />
                          }
                        />

                        {/* for sake of padding in button column */}
                        <View style={{
                          height: Metrics.pad / 2,
                        }}>
                        </View>

                        <Button
                          onPress={() => console.log('should run this.goToTruck')}
                          buttonStyle={[styles.circleButton, style={backgroundColor: Colors.orange}]}
                          containerStyle={[styles.buttonContainer, style={backgroundColor: Colors.orange}]}
                          titleStyle={{
                            color: Colors.white,
                            fontSize: Metrics.font4,
                          }}
                          title=''
                          icon={
                            <Feather
                              name='map-pin'
                              size={18}
                              color='white'
                            />
                          }
                        />
                      </View>

                    </View>

                  </View>
                </TouchableOpacity>

                }
                renderSectionHeader={({section: {title}}) => (
                  <View style={[styles.shadowSmall, styles.sectionHead]}>
                    {
                      this.state.fontLoaded ? (
                        <Text style={{
                          fontFamily: 'lato-bold',
                          color: Colors.gray1,
                          letterSpacing: 1,
                          fontSize: Metrics.font5
                        }}>{title}</Text>
                      ) : null
                    }
                  </View>
                )}

                sections={this.state.sectionListData}
                keyExtractor={(item, index) => item + index}
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
    backgroundColor: Colors.orange,

  },

  titleContainer: {
    height: Metrics.nav * 1.25,
    backgroundColor: Colors.gray7,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',

    borderBottomWidth: 1,
    borderColor: Colors.gray5,

    zIndex: 1,
  },

  title: {
    color: Colors.gray1,
    fontSize: Metrics.font3,
    paddingBottom: Metrics.pad / 2,
    fontFamily: 'lato-bold',

  },

  listContainer: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',

    // TODO: change this to reveal some cool illustration
    backgroundColor: Colors.orange,
  },

  sectionHead: {
    backgroundColor: Colors.white,
    height: Metrics.button,
    justifyContent: 'center',
    paddingHorizontal: Metrics.pad,
  },

  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: Colors.white,

    borderColor: Colors.gray6,
    borderBottomWidth: 1,

    padding: Metrics.pad * 1.25,

  },

  info: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
  },

  shadow: {
    shadowColor: Colors.black,
    shadowOpacity: Metrics.glow / 4,
    shadowRadius: 20,
    shadowOffset: {width: 0, height: 4}
  },

  shadowSmall: {
    shadowColor: Colors.black,
    shadowOpacity: Metrics.glow / 9,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 4},
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
    shadowOpacity: Metrics.glow / 2,
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

  nav: {
    height: Metrics.nav,
    backgroundColor: Colors.purple,
  },


});
