import React, { Component } from 'react'
import PropTypes from 'prop-types' //consider using this!
import {
  StyleSheet,
  Platform,
  Animated,
  StatusBar,
  RefreshControl,
  SafeAreaView,
  View,
  Dimensions,
  FlatList, SectionList,
  ScrollView,
  Text, Linking, ActivityIndicator, TouchableOpacity, Image } from 'react-native'
import { Metrics, Colors, Images } from '../Themes'
import {profilesList} from '../Themes/Profiles.js'

import { material } from 'react-native-typography'
import { Feather, MaterialIcons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { Overlay, Button } from 'react-native-elements';
import { Font } from 'expo';
import DateTimePicker from 'react-native-modal-datetime-picker';

import Carousel from 'react-native-snap-carousel';
import { ENTRIES1 } from '../Themes/Pictures.js';

import MultipleTags from 'react-native-multiple-tags';

const HEADER_MAX_HEIGHT = 300;
const HEADER_MIN_HEIGHT = Metrics.nav * 1.25;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scrollY: new Animated.Value(
        // iOS has negative initial scroll value because content inset...
        Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0,
      ),
      refreshing: false,
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

  _renderScrollViewContent() {
    const data = Array.from({ length: 30 });
    return (
      <View style={styles.scrollViewContent}>
        {data.map((_, i) => (
          <View key={i} style={styles.row}>
            <Text>{i}</Text>
          </View>
        ))}
      </View>
    );
  }

  render() {
    // Because of content inset the scroll value will be negative on iOS so bring
    // it back to 0.
    const scrollY = Animated.add(
      this.state.scrollY,
      Platform.OS === 'ios' ? HEADER_MAX_HEIGHT : 0,
    );
    const headerTranslate = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, -HEADER_SCROLL_DISTANCE],
      extrapolate: 'clamp',
    });

    const imageOpacity = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 0],
      extrapolate: 'clamp',
    });
    const imageTranslate = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 100],
      extrapolate: 'clamp',
    });

    const titleScale = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 0.8],
      extrapolate: 'clamp',
    });
    const titleTranslate = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 0, -8],
      extrapolate: 'clamp',
    });

    return (
      <View style={styles.container}>
        <StatusBar
          translucent
          barStyle="light-content"
          backgroundColor="rgba(0, 0, 0, 0.251)"
        />

        <Animated.ScrollView
          style={styles.fill}
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
            { useNativeDriver: true },
          )}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={() => {
                this.setState({ refreshing: true });
                setTimeout(() => this.setState({ refreshing: false }), 1000);
              }}
              // Android offset for RefreshControl
              progressViewOffset={HEADER_MAX_HEIGHT}
            />
          }
          // iOS offset for RefreshControl
          contentInset={{
            top: HEADER_MAX_HEIGHT,
          }}
          contentOffset={{
            y: -HEADER_MAX_HEIGHT,
          }}
        >
          {this._renderScrollViewContent()}
        </Animated.ScrollView>

        <Animated.View
          pointerEvents="none"
          style={[
            styles.header,
            { transform: [{ translateY: headerTranslate }] },
          ]}
        >
          <Animated.Image
            style={[
              styles.backgroundImage,
              {
                opacity: imageOpacity,
                transform: [{ translateY: imageTranslate }],
              },
            ]}
            source={Images.sanjeet_food_truck}
          />
        </Animated.View>

        {/* header */}
        <Animated.View
          style={[
            styles.titleContainer,
            {
              transform: [
                { scale: titleScale },
                { translateY: titleTranslate },
              ],
            },
          ]}
        >

          {
            this.state.fontLoaded ? (
              <Text style={styles.title}>{'Visited'}</Text>
            ) : null
          }
        </Animated.View>
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
  backgroundColor: Colors.yellow,
},

title: {
  color: Colors.gray1,
  fontSize: Metrics.font3,
  paddingBottom: Metrics.pad / 2,
  fontFamily: 'lato-bold',
},

titleContainer: {
  backgroundColor: Colors.gray7,
  height: Metrics.nav * 1.25,
  flexDirection: 'row',
  alignItems: 'flex-end',
  justifyContent: 'center',
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,

  backgroundColor: Colors.gray7,
  borderBottomWidth: 1,
  borderColor: Colors.gray5,

  zIndex: 1,
},

    tags: {
      backgroundColor: "rgba(92, 99,216, 1)",
      width: 150,
      height: 45,
      borderColor: "transparent",
      borderWidth: 0,
      borderRadius: 5
    },

    sectionHead: {
      backgroundColor: Colors.white,
      height: Metrics.button,
      justifyContent: 'center',
      paddingHorizontal: Metrics.pad,
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

    shadow: {
      shadowColor: Colors.black,
      shadowOpacity: Metrics.glow / 2,
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

    buttonRow: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      paddingTop: 5,
    },


    overlayContainer: {
      flexDirection: 'column',
      justifyContent: 'flex-end',
      backgroundColor: Colors.inactive,
      alignItems: 'center',

      zIndex: 1,
    },

    overlay: {
      flex: 0.11,
      justifyContent: 'space-evenly',
      alignItems: 'center',
      backgroundColor: Colors.white,
      padding: Metrics.pad * 1.25,
      paddingBottom: Metrics.nav * 1.5,

    },


  content: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#03A9F4',
    overflow: 'hidden',
    height: HEADER_MAX_HEIGHT,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: null,
    height: HEADER_MAX_HEIGHT,
    resizeMode: 'cover',
  },

  scrollViewContent: {
    // iOS uses content inset, which acts like padding.
    paddingTop: Platform.OS !== 'ios' ? HEADER_MAX_HEIGHT : 0,
  },
  row: {
    height: 40,
    margin: 16,
    backgroundColor: '#D3D3D3',
    alignItems: 'center',
    justifyContent: 'center',
  },


});
