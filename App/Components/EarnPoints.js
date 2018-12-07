import React, { Component } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native';
import { Overlay, Button } from 'react-native-elements';
import { Feather, MaterialIcons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

import { Metrics, Colors, Images } from '../Themes'

export default class EarnPoints extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isVisible: false,
      source: '',
    };
  }

  toggleVisibility = (source) => {
    this.setState({
      isVisible: !this.state.isVisible,
      source: source
    });
  }

  render() {
    return (
      <Overlay
        isVisible={this.state.isVisible}
        windowBackgroundColor='rgba(0,0,0,0.25)'
        overlayBackgroundColor='white'
        containerStyle={styles.overlayContainer}
        overlayStyle={[styles.overlay, styles.shadow]}
        fullScreen={true}
        onBackdropPress={() => this.setState({
          isVisible: !this.state.isVisible,
        })}
      >
        <Text style={styles.header}>Congrats!</Text>

        <Feather
          name='gift'
          size={Metrics.button}
          color={Colors.orange}
        />

        <View>
          <Text style={styles.description}>Thanks for {this.state.source}! </Text>
          <Text style={styles.description}>You earned <Text style={styles.emphasis}>10 points.</Text></Text>
        </View>

        <Button
          buttonStyle={styles.button}
          containerStyle={styles.buttonContainer}
          titleStyle={{
            color: Colors.white,
            fontSize: Metrics.font4,
          }}
          title=''
          icon={
            <Feather
            name='x'
            size={20}
            color={Colors.grey4}
            />
          }
          onPress={() => this.setState({
            isVisible: !this.state.isVisible,
          })}
        />
      </Overlay>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: Colors.orange,
    },

    overlayContainer: {
      flexDirection: 'column',
      backgroundColor: Colors.inactive,
      alignItems: 'center',
      justifyContent: 'center',

      zIndex: 1,
    },

    overlay: {
      flex: 0.4,
      width: 300,
      justifyContent: 'space-evenly',
      alignItems: 'center',
      backgroundColor: Colors.white,

    },

    header: {
      fontSize: 28,
      fontWeight: 'bold',
      color: Colors.black,
    },

    description: {
      fontSize: 18,
      color: Colors.gray1,
      textAlign: 'center',
    },

    emphasis: {
      fontWeight: 'bold',
      color: Colors.orange,
    },

    shadow: {
      shadowColor: Colors.black,
      shadowOpacity: Metrics.glow / 2,
      shadowRadius: 20,
      shadowOffset: {width: 0, height: 4}
    },

    buttonAlignment: {
      flexDirection: 'row',
      alignSelf: 'flex-end',
      marginTop: -50
    },

    button: {
      borderRadius: Metrics.button,
      height: Metrics.button,
      paddingLeft: Metrics.button / 4,
      paddingRight: Metrics.button / 4,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors.gray6,
    },

    buttonContainer: {
      borderRadius: Metrics.button,
    },
});
