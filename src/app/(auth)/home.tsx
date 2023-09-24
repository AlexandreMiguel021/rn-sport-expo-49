import { Button } from '@/components/Button'
import { Text } from '@/components/Text'
import { toast } from '@/components/Toast'
import { AuthError } from '@/utils/auth-error-handler'
import auth from '@react-native-firebase/auth'
import { useCallback } from 'react'
import { StyleSheet, View } from 'react-native'

export default function Home() {
  const handleSignOutPress = useCallback(() => {
    try {
      auth().signOut()
    } catch (error) {
      if (error instanceof AuthError) {
        toast.error({ title: 'Ocorreu um erro', text: error.message })
      }
    }
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title} weigth="bold">
          Olá!!
        </Text>
        <Text style={styles.subtitle}>
          your are logged with {auth().currentUser?.email?.toString() || ''}
        </Text>
        <Button title="Sair" onPress={handleSignOutPress} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 12
  },
  main: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 'auto'
  },
  title: {
    fontSize: 64
  },
  subtitle: {
    fontSize: 36,
    color: '#38434D',
    marginBottom: 32
  }
})
