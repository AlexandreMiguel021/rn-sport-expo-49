import { Dimensions, StyleSheet } from 'react-native'

const screenWidth = Dimensions.get('screen').width
const screenHeight = Dimensions.get('screen').height

export const LoadingStyles = StyleSheet.create({
  loading_container: {
    backgroundColor: '#ffffffc8',
    height: screenHeight,
    flex: 1,
    position: 'absolute',
    right: 0,
    width: screenWidth,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 5
  },
  loading_lottie: {
    width: 300,
    height: 300,
    zIndex: 8
  }
})
