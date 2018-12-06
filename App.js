import React, { Component } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator, TabBarBottom, createAppContainer} from 'react-navigation';
import HomeMap from './App/Components/HomeMap';
//import Rewards from './App/Components/Rewards';
import Visited from './App/Components/Visited';
import Followed from './App/Components/Followed';
import Profile from './App/Components/Profile';
import { Feather, MaterialIcons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

import { Font } from 'expo';
import { Metrics, Colors, Images } from './App/Themes'

import Icon from '@expo/vector-icons/MaterialCommunityIcons'

const TabNavigator = createBottomTabNavigator(
  {
    HomeMap: {
      screen: HomeMap,
      navigationOptions: {
        tabBarIcon:
          <Feather
            name='map-pin'
            size={20}
          />,
          tabBarLabel: 'Map',
      },
    },
    //Rewards: Rewards,

    Rewards: {
      screen: Followed,
      navigationOptions: {
        tabBarIcon:
          <Feather
            name='award'
            size={20}
          />,
      },
    },

    Followed: {
      screen: Followed,
      navigationOptions: {
        tabBarIcon:
          <Feather
            name='star'
            size={20}
          />,
          tabBarLabel: 'Followed',
      },
    },

    Visited: {
      screen: Visited,
      navigationOptions: {
        tabBarIcon:
          <Feather
            name='clock'
            size={20}
          />,
          tabBarLabel: 'Followed',
      },
    },

  },
  {
    initialRouteName: 'HomeMap',
    order: ['HomeMap', 'Rewards', 'Followed', 'Visited'],
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      showLabel: false,
      activeTintColor: Colors.orange,
      inactiveTintColor: Colors.gray1,
      activeBackgroundColor: Colors.gray6,
      tabStyle: {
        //paddingBottom: Metrics.padSmall, // note: idk if this is needed, but the Android bar is in the way
      },
      style: {
        flexDirection: 'row',
        height: Metrics.nav,
        backgroundColor: Colors.white,
        justifyContent: 'space-evenly',
        alignItems: 'center',

        shadowColor: Colors.black,
        shadowOpacity: Metrics.shadow / 2,
        shadowRadius: 5,
        shadowOffset: {width: 0, height: 2},
      },
    },
    animationEnabled: false, // idk what this does lol
    swipeEnabled: true, // I don't think it actually supports swipes lol
  }
);

export default createAppContainer(TabNavigator);


//Commented out for now, not sure if this code needs to be moved elsewhere
//
// export default class App extends React.Component {
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
//             <HomeMap />
//           ) : null
//         }
//       </View>
//     );
//   }
// }
//
const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: Colors.yellow,
    },
});
