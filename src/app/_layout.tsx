import { Slot, router, useSegments } from 'expo-router'
import { Fragment, useEffect, useState } from 'react'
import { StatusBar } from 'react-native'
import { useFonts } from 'expo-font'
import auth from '@react-native-firebase/auth'

import { Loading } from '@/components/Loading/Loading.component'

export default function RootLayout() {
  useFonts({
    Poppins: require('@/assets/fonts/Poppins-Regular.ttf'),
    Poppins100: require('@/assets/fonts/Poppins-Thin.ttf'),
    Poppins200: require('@/assets/fonts/Poppins-ExtraLight.ttf'),
    Poppins300: require('@/assets/fonts/Poppins-Light.ttf'),
    Poppins500: require('@/assets/fonts/Poppins-Medium.ttf'),
    Poppins600: require('@/assets/fonts/Poppins-SemiBold.ttf'),
    Poppins700: require('@/assets/fonts/Poppins-Bold.ttf')
  })

  const segments = useSegments()
  const currentGroup = segments['0']

  const [initializing, setInitializing] = useState(true)

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((user) => {
      if (user && !inTabsGroup) router.replace('/home')
      else if (!user) router.replace('/login')

      if (initializing) {
        setInitializing(false)
      }
    })

    const inTabsGroup = currentGroup === '(auth)'

    return subscriber
  }, [currentGroup])

  return (
    <Fragment>
      <StatusBar barStyle="light-content" />
      <Loading />
      <Slot />
    </Fragment>
  )
}
