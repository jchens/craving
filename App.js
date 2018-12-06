import React, { Component } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator, TabBarBottom, createAppContainer} from 'react-navigation';
import HomeMap from './App/Components/HomeMap';
//import TruckMap from './App/Components/TruckMap';
//import Rewards from './App/Components/Rewards';
import Visited from './App/Components/Visited';
import Followed from './App/Components/Followed';

import { Font } from 'expo';
import { Metrics, Colors, Images } from './App/Themes'

import Icon from '@expo/vector-icons/MaterialCommunityIcons'

const TabNavigator = createBottomTabNavigator(
  {
    //Map: HomeMap,
    //Rewards: Rewards,
    Followed: Followed,
    Visited: Visited
  },
  {
    //initialRouteName: 'Map',
    //order: ['Map', /*'Rewards',*/'Followed', 'Visited'],
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: Colors.blue,
      inactiveTintColor: Colors.gray3,
      tabStyle: {
        paddingBottom: 15, // note: idk if this is needed, but the Android bar is in the way
      },
    },
    animationEnabled: false, // idk what this does lol
    swipeEnabled: true, // I don't think it actually supports swipes lol
  }
);

export default createAppContainer(TabNavigator);


// Commented out for now, not sure if this code needs to be moved elsewhere

//export default class App extends React.Component {
//
//   state = {
//     fontLoaded: false,
//   };
//
//   async componentDidMount() {
//     await Font.loadAsync({
//       'lato-regular': require('./assets/fonts/Lato-Regular.ttf'),
//       'lato-bold': require('./assets/fonts/Lato-Bold.ttf'),
//       'lato-light': require('./assets/fonts/Lato-Light.ttf'),
//
//     });
//
//     this.setState({ fontLoaded: true });
//   }
//
//
//   render() {
//     return (
//       <View style={styles.container}>
//         {
//           this.state.fontLoaded ? (
//             // <Text style={{fontFamily: 'lato-bold'}}>Hi!</Text>
//             <Followed />
//           ) : null
//         }
//       </View>
//     );
//   }
// }
//
// const styles = StyleSheet.create({
//   container: {
//       flex: 1,
//       backgroundColor: Colors.yellow,
//     },
//   nav: {
//     paddingTop: 30,
//   }
//});
