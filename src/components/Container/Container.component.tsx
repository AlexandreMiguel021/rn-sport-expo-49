import { PropsWithChildren } from 'react'
import { View } from 'react-native'

export function Container({ children }: PropsWithChildren) {
  return (
    <View
      style={{
        padding: 16,
        flex: 1,
        backgroundColor: "#fff"
      }}
    >
      {children}
    </View>
  )
}
