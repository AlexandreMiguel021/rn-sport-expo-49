import { theme } from '@/theme'
import { Stack } from 'expo-router'

export default function PublicLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.primary },
        headerTintColor: '#fff',
        headerBackTitle: 'Back'
      }}
    >
      <Stack.Screen
        name="login"
        options={{
          headerTitle: 'Login'
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="register"
        options={{
          headerTitle: 'Criar conta'
        }}
      ></Stack.Screen>
    </Stack>
  )
}
