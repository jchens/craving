
import {Dimensions, Platform} from 'react-native'

const { width, height } = Dimensions.get('window')

// Used via Metrics.baseMargin
const metrics = {
  marginHorizontal: 10,
  marginVertical: 10,
  section: 25,
  baseMargin: 10,
  doubleBaseMargin: 20,
  smallMargin: 5,
  pad: 20,
  padSmall: 15,
  padBig: 40,

  shadow: 0.2,
  glow: 1,

  horizontalLineHeight: 1,
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
  navBarHeight: (Platform.OS === 'ios') ? 64 : 54,
  button: 40,
  nav: 50,

  image: 60,

  curve: 5,
  icons: {
    tiny: 15,
    small: 20,
    medium: 30,
    large: 45,
    xl: 50
  },
  images: {
    small: 20,
    medium: 40,
    large: 60,
    logo: 200,
  },

  font1: 36,
  font2: 24,
  font3: 18,
  font4: 14,
  font5: 12,
}

export default metrics
