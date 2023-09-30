import auth from '@react-native-firebase/auth'
import { useFonts } from 'expo-font'
import { Slot, router } from 'expo-router'
import { Fragment, useCallback, useEffect } from 'react'

import { Loading, useLoadingStore } from '@/components/Loading/Loading.component'
import { Toast } from '@/components/Toast'
import { IUserFb } from '@/models/user'

useLoadingStore.setState({ isLoading: true })

export default function RootLayout() {
  const setIsLoading = useLoadingStore((action) => action.setLoading)

  useFonts({
    Poppins: require('@/assets/fonts/Poppins-Regular.ttf'),
    Poppins100: require('@/assets/fonts/Poppins-Thin.ttf'),
    Poppins200: require('@/assets/fonts/Poppins-ExtraLight.ttf'),
    Poppins300: require('@/assets/fonts/Poppins-Light.ttf'),
    Poppins500: require('@/assets/fonts/Poppins-Medium.ttf'),
    Poppins600: require('@/assets/fonts/Poppins-SemiBold.ttf'),
    Poppins700: require('@/assets/fonts/Poppins-Bold.ttf')
  })

  const redirectBasedOnUser = useCallback((user: IUserFb | null) => {
    if (user) {
      router.replace('/home')
    } else {
      router.replace('/login')
    }
  }, [])

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(redirectBasedOnUser)

    setIsLoading(false)

    return subscriber
  }, [redirectBasedOnUser, setIsLoading])

  return (
    <Fragment>
      <Toast />
      <Loading />
      <Slot />
    </Fragment>
  )
}
