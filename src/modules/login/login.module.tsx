import { Link } from 'expo-router'
import { useForm } from 'react-hook-form'
import { Keyboard, Pressable, View } from 'react-native'

import { Button } from '@/components/Button/Button.component'
import { Container } from '@/components/Container/Container.component'
import { useLoadingStore } from '@/components/Loading/Loading.component'
import { Text } from '@/components/Text'
import { toast } from '@/components/Toast'
import { HFTextInput } from '@/components/hook-forms-inputs'
import { theme } from '@/theme'
import { AuthError } from '@/utils/auth-error-handler'
import { zodResolver } from '@hookform/resolvers/zod'

import { LoginFormData, LoginUserSchema } from './login.schema'
import { loginService } from './login.service'
import { loginStyles } from './login.styles'

export function LoginModule() {
  const setIsLoading = useLoadingStore((action) => action.setLoading)

  const { control, handleSubmit } = useForm<LoginFormData>({
    resolver: zodResolver(LoginUserSchema)
  })

  async function handleUserLoginSubmit(values: LoginFormData) {
    try {
      Keyboard.dismiss()
      setIsLoading(true)
      await loginService.authenticateUser(values)
    } catch (error) {
      if (error instanceof AuthError) {
        toast.error({ title: 'Não foi possível fazer login', text: error.message })
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Container>
      <View style={loginStyles.main}>
        <Text style={{ fontSize: 42, color: theme.colors.primary }} weigth="bold">
          RN Sport
        </Text>
        <Text style={loginStyles.description}>
          Faça o login para acessar sua conta e explorar um mundo de possibilidades.
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
        <Button title="Entrar" onPress={handleSubmit(handleUserLoginSubmit)} />
        <Link href="/register" asChild>
          <Pressable style={loginStyles.pressable}>
            <Text style={loginStyles.pressable_text}>Criar uma conta</Text>
          </Pressable>
        </Link>
      </View>
    </Container>
  )
}
