import { Stack } from 'expo-router'
import { View } from 'react-native'

export default function PublicLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#DE6449',
        },
        headerTintColor: '#fff',
        headerBackTitle: 'Back',
      }}
    >
      <Stack.Screen
        name="login"
        options={{ headerTitle: 'Sport Login' }}
      ></Stack.Screen>
      <Stack.Screen
        name="register"
        options={{
          headerTitle: 'Criar conta',
        }}
      ></Stack.Screen>
    </Stack>
  )
}
