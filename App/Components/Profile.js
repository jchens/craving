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
  'Affordable',
  'Good Food',
  'Small Portions',
  'Long Line',
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
    value: 'Affordable',
  },
  {
    key: 'id_02',
    value: 'Good Food',
  },
  {
    key: 'id_03',
    value: 'Small Portions',
  },
  {
    key: 'id_04',
    value: 'Long Line'
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

const item =   {
      name: "Justine Robinson",
      icon: require('../Images/FTProfiles/trijeet.jpeg'),
      friend: true,
      date: "2 days ago",
      positiveTags: ["Great carnitas", "Friendly Staff"],
      negativeTags: ["Oily", "Long Line"]
  }

const truck = profilesList[6];


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
          <View>
            <View style={[styles.listItem]}>
              <View style={styles.info}>


                {/* view to hold image for shadow*/}
                <View style={[styles.shadowSmall, style={
                  flex: 1,
                  backgroundColor: Colors.white,
                  //borderRadius: Metrics.curve,
                  borderWidth: 4,
                  borderColor: Colors.white,

                  shadowColor: Colors.black,
                  shadowOpacity: Metrics.shadow * 0.75,
                  shadowRadius: 5,
                  shadowOffset: {width: 0, height: 4},
                }]}>
                  <Image source={truck.image} resizeMode='contain' style={{
                    //borderRadius: Metrics.curve,
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
                    fontWeight: 'bold',
                  }}> {truck.name} </Text>
                  <Text style={{
                    color: Colors.gray3,
                    fontSize: Metrics.font5,
                    paddingVertical: 5
                  }}> {truck.cuisine} </Text>
                  <Text style={{
                    flexWrap: 'wrap',
                    textAlign: 'left',
                    fontSize: Metrics.font5,
                  }}> {truck.description} </Text>
                </View>



                {/* buttom column */}
                <View style={{
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                }}>

                  <Button
                    key={index}
                    buttonStyle={
                      [styles.circleButton, styles.glow, style={backgroundColor: Colors.yellow}]
                    }
                    containerStyle={[styles.buttonContainer, style={backgroundColor: Colors.yellow}]}
                    titleStyle={{
                      color: Colors.white,
                    }}
                    onPress={() => console.log('hi')}
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


          <Text> PHOTOS </Text>

          <Carousel
            data={ENTRIES1}
            renderItem={this._renderItem}
            sliderWidth={width}
            itemWidth={200}
            itemHeight={50}
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
                  <View style={[styles.listItem]}>










                  {/* hold photo, info, and address (to the right is the button column)*/}
                    <View style={{
                      flex: 1,
                      flexDirection: 'column',
                      justifyContent: 'flex-start',
                    }}>

                      {/* info: holding photo, info*/}
                      <View style={styles.info}>

                        {/* view to hold image for shadow*/}
                        <View style={[styles.shadowSmall, style={
                          flex: 1,
                          backgroundColor: Colors.white,
                          //borderRadius: Metrics.curve,
                          borderWidth: 4,
                          borderColor: Colors.white,

                          shadowColor: Colors.black,
                          shadowOpacity: Metrics.shadow * 0.75,
                          shadowRadius: 5,
                          shadowOffset: {width: 0, height: 4},
                        }]}>
                          <Image source={item.icon} resizeMode='contain' style={{
                            //borderRadius: Metrics.curve,
                            aspectRatio: 1,
                            width: 75,
                            height: 75,
                          }}/>
                        </View>

                        {/* info */}
                        <View style={{
                          flex: 2,
                          paddingHorizontal: Metrics.padSmall,
                        }}>
                          <Text style={{
                            fontSize: Metrics.font3,
                            fontWeight: 'bold',
                          }}> {item.name} </Text>
                          <Text style={{
                            color: Colors.gray3,
                            fontSize: Metrics.font5,
                            paddingVertical: 5
                          }}> {item.date} </Text>
                        </View>

                      </View>

                      {/* address, time*/}
                      <View style={{
                        paddingTop: Metrics.padSmall,
                      }}>
                        <Text style={{
                          fontWeight: 'bold',
                          flexWrap: 'wrap',
                        }}>{item.time}</Text>
                        <Text style={{
                          flexWrap: 'wrap',
                        }}>{item.address}</Text>
                      </View>

                      <View>
                        {
                          item.positiveTags.map(tag =>
                            <Button
                             title= {tag}
                             buttonStyle={{
                               backgroundColor: "rgba(92, 99,150, 1)",
                               width: 150,
                               height: 45,
                               borderColor: "transparent",
                               borderWidth: 0,
                               borderRadius: 5
                             }}
                             containerStyle={{ marginTop: 20 }}
                            />
                          )
                        }
                      </View>
                      <View>
                        {
                          item.negativeTags.map(tag =>
                            <Button
                             title= {tag}
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
                          )
                        }
                      </View>
                    </View>

                  </View>










                )
              }
            />

          </View>
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
  },

  listItem: {
    paddingVertical: Metrics.pad * 1.25,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: Colors.white,

    borderColor: Colors.gray6,
    borderBottomWidth: 1,
    paddingHorizontal: Metrics.pad * 1.25,
  },

  info: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
  },

  shadowSmall: {
    shadowColor: Colors.black,
    shadowOpacity: Metrics.shadow / 2,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 2},
  },
});
