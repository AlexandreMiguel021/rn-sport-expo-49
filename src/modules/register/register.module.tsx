import Toast from 'react-native-toast-message'

import { zodResolver } from '@hookform/resolvers/zod'
import { router } from 'expo-router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Keyboard, View } from 'react-native'

import { Button } from '@/components/Button/Button.component'
import { Container } from '@/components/Container/Container.component'
import { HFTextInput } from '@/components/hook-forms-inputs/HFTextInput'
import { Text } from '@/components/Text'
import { toast } from '@/components/Toast'
import { AuthError } from '@/utils/auth-error-handler'

import { RegisterFormData, registerUserSchema } from './register.schema'
import { registerService } from './register.service'
import { registerStyles } from './register.styles'
import { useLoadingStore } from '@/components/Loading/Loading.component'

export function RegisterModule() {
  const setIsLoading = useLoadingStore((action) => action.setLoading)
  const isLoading = useLoadingStore((action) => action.isLoading)

  const { control, handleSubmit } = useForm<RegisterFormData>({
    resolver: zodResolver(registerUserSchema)
  })

  async function handleCreateUserButtonSubmit(values: RegisterFormData) {
    try {
      Keyboard.dismiss()
      setIsLoading(true)
      await registerService.createUser(values)
      Toast.show({ type: 'success', text1: 'Conta criada com sucesso!' })
    } catch (error) {
      if (error instanceof AuthError) {
        toast.error({ title: 'Erro ao Cadastrar', text: error.message })
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Container>
      <View style={registerStyles.main}>
        <Text style={registerStyles.description}>
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
        <Button
          isLoading={isLoading}
          title="Criar conta"
          onPress={handleSubmit(handleCreateUserButtonSubmit)}
        />
      </View>
    </Container>
  )
}
