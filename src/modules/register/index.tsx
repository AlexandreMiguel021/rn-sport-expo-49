import { zodResolver } from '@hookform/resolvers/zod'
import { router } from 'expo-router'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Text, View } from 'react-native'

import { Button } from '@/components/inputs/Button'
import { Container } from '@/components/layouts/Container'
import { HFTextInput } from '@/components/hook-forms-inputs/HFTextInput'

import { RegisterFormData, registerUserSchema } from './schema'
import { registerService } from './service'
import { styles } from './styles'

export default function RegisterModule() {
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { control, handleSubmit } = useForm<RegisterFormData>({
    resolver: zodResolver(registerUserSchema),
  })

  const userCreatedSuccessfullyFeedback = useCallback(() => {
    setSuccessMessage('Conta criada com sucesso!')
    setErrorMessage('')
    setTimeout(() => {
      router.back()
    }, 500)
  }, [])

  async function handleCreateUserButtonSubmit(values: RegisterFormData) {
    try {
      setIsLoading(true)
      await registerService.createUser(values)
      userCreatedSuccessfullyFeedback()
    } catch (err) {
      setErrorMessage(err as string)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Container>
      <View style={styles.main}>
        <Text style={styles.description}>
          Crie sua conta com email e senha para começar a utilzar o aplicativo
        </Text>
        <HFTextInput
          control={control}
          name="email"
          placeholder="Seu email"
          textContentType="emailAddress"
          keyboardType="email-address"
        />
        <HFTextInput
          control={control}
          name="password"
          placeholder="Sua senha"
          textContentType="password"
          secureTextEntry
          keyboardType="number-pad"
        />

        {successMessage && (
          <Text style={styles.success_text}>{successMessage}</Text>
        )}
        {errorMessage && <Text style={styles.error_text}>{errorMessage}</Text>}
        <Button
          isLoading={isLoading}
          title="Criar conta"
          onPress={handleSubmit(handleCreateUserButtonSubmit)}
        />
      </View>
    </Container>
  )
}
