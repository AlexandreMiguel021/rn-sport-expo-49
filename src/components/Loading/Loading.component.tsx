import AnimatedLottieView from 'lottie-react-native'
import { Dimensions, View } from 'react-native'

const screenWidth = Dimensions.get('screen').width
const screenHeight = Dimensions.get('screen').height

import LoadingLottie from '@/assets/anim/loading.json'

import { create } from 'zustand'

interface LoadingStore {
  isLoading: boolean
  setLoading: (value: boolean) => void
}

export const useLoadingStore = create<LoadingStore>((set) => ({
  isLoading: false,
  setLoading: (value: boolean) => set({ isLoading: value })
}))

export function Loading() {
  const isLoading = useLoadingStore((state) => state.isLoading)

  if (!isLoading) {
    return <></>
  }

  return (
    <View
      style={{
        backgroundColor: 'white',
        height: screenHeight,
        flex: 1,
        position: 'absolute',
        right: 0,
        width: screenWidth,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 5
      }}
    >
      <AnimatedLottieView
        autoPlay
        useNativeLooping
        loop
        resizeMode="contain"
        style={{ width: 300, height: 300 }}
        source={LoadingLottie}
      />
    </View>
  )
}
