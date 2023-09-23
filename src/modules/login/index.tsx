import { Button } from '@/components/inputs/Button'
import { Container } from '@/components/layouts/Container'
import { Link } from 'expo-router'
import { useState } from 'react'
import { Pressable, Text, TextInput, View } from 'react-native'

import { loginService } from './service'
import { styles } from './styles'

export default function LoginModule() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleUserLoginSubmit() {
    try {
      await loginService.authenticateUser({ email, password })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Container>
      <View style={styles.main}>
        <Text style={styles.description}>
          Faça o login para acessar sua conta e explorar um mundo de possibilidades.
        </Text>
        <TextInput style={styles.inputext} placeholder="Seu email" />
        <TextInput style={styles.inputext} placeholder="Sua senha" />
        <Button title="Entrar" onPress={handleUserLoginSubmit} />

        <Link href="/register" asChild>
          <Pressable style={styles.pressable}>
            <Text style={styles.pressable_text}>Criar uma conta</Text>
          </Pressable>
        </Link>
      </View>
    </Container>
  )
}
