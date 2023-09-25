import AnimatedLottieView from 'lottie-react-native'

import { create } from 'zustand'
import { View } from 'react-native'

import LoadingLottie from '@/assets/anim/loading.json'

import { LoadingStyles } from './Loading.styles'

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
    <View style={LoadingStyles.loading_container}>
      <AnimatedLottieView
        autoPlay
        useNativeLooping
        loop
        resizeMode="contain"
        style={LoadingStyles.loading_lottie}
        source={LoadingLottie}
      />
    </View>
  )
}
