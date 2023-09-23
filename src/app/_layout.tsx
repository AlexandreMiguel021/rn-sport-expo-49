import { Slot, router, useSegments } from 'expo-router'
import { useEffect } from 'react'

const isLogged = false

export default function RootLayout() {
  const segments = useSegments()

  useEffect(() => {
    const inTabsGroup = segments['0'] === '(auth)'

    if (isLogged && !inTabsGroup) router.replace('/home')
    else if (!isLogged) router.replace('/login')
  }, [])

  return <Slot />
}
