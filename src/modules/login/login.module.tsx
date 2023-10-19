import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'expo-router'
import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Keyboard, Pressable, PressableProps, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import { Button } from '@/components/Button/Button.component'
import { Container } from '@/components/Container/Container.component'
import { useLoadingStore } from '@/components/Loading/Loading.component'
import { Text } from '@/components/Text'
import { toast } from '@/components/Toast'
import { HFCheckbox, HFTextInput } from '@/components/hook-forms-inputs'
import { theme } from '@/theme'
import { AuthError } from '@/utils/auth-error-handler'

import { LoginFormData, LoginUserSchema } from './login.schema'
import { loginService } from './login.service'
import { useLoginStore } from './login.store'
import { loginStyles } from './login.styles'

import Animated, {
  CurvedTransition,
  FadeInUp,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming
} from 'react-native-reanimated'

import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView
} from 'react-native-gesture-handler'

const PressableAnimated = Animated.createAnimatedComponent(Pressable)

let showPop = (message: string, onPress?: () => void): void => {}

interface IToast {
  id: string
  message: string
  title?: string
  type: 'success' | 'error'
  onPress?(): void
  time?: number
}

function Pop() {
  const [toasts, setToasts] = useState<IToast[]>([])

  showPop = (message: string, onPress?: () => void): void => {
    if (toasts.some((toast) => toast.message === message) || !message) return

    setToasts([
      ...toasts,
      {
        id: new Date().toISOString(),
        type: 'success',
        message,
        onPress,
        time: 3000
      }
    ])
  }

  const onSwipeComplete = (toastId: string) => {
    setToasts((prev) => prev.filter((i) => i.id !== toastId))
  }

  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
        gap: 8,
        position: 'absolute',
        elevation: 5,
        zIndex: 5,
        width: '100%',
        top: 0
      }}
    >
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toastItem={toast} onSwipeComplete={onSwipeComplete} />
      ))}
    </GestureHandlerRootView>
  )
}

function CloseToastButton(props: PressableProps) {
  return (
    <Pressable {...props} style={{ paddingTop: 4 }}>
      <Ionicons name="md-close-sharp" size={24} color="black" />
    </Pressable>
  )
}

function ToastItem({
  toastItem,
  onSwipeComplete
}: {
  toastItem: IToast
  onSwipeComplete: (toastId: string) => void
}) {
  const [openToast, setOpenToast] = useState(false)
  const pressed = useSharedValue(false)
  const offset = useSharedValue(0)
  const opacity = useSharedValue(1)

  const maxMessage = toastItem.message.slice(0, 90) + '...'
  const totalMessage = toastItem.message

  const pan = Gesture.Pan()
    .onBegin(() => {
      pressed.value = true
    })
    .onChange((event) => {
      offset.value = event.translationX
    })
    .onFinalize(() => {
      offset.value = withSpring(0)
      pressed.value = false
    })
    .onEnd((e) => {
      if (e.translationX > 80) {
        runOnJS(onSwipeComplete)(toastItem.id)
      }
    })

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }]
  }))

  const outStyles = useAnimatedStyle(() => ({
    opacity: withTiming(opacity.value, { duration: 250 })
  }))

  const closeToast = useCallback(() => {
    opacity.value = 0

    setTimeout(() => {
      onSwipeComplete(toastItem.id)
    }, 250)
  }, [onSwipeComplete, opacity, toastItem.id])

  const handleToastLongPress = () => {
    if (toastItem.message.length >= 90) {
      setOpenToast(true)
    }
  }

  useEffect(() => {
    // if (openToast) return
    // const timerId = setTimeout(() => {
    //   closeToast()
    // }, toastItem.time)
    // return () => {
    //   clearTimeout(timerId)
    // }
  }, [closeToast, openToast, toastItem.time])

  return (
    <GestureDetector gesture={pan}>
      <PressableAnimated
        layout={CurvedTransition}
        entering={FadeInUp}
        onLongPress={handleToastLongPress}
        style={[
          animatedStyles,
          outStyles,
          {
            backgroundColor: '#ffffff',
            paddingLeft: 8,
            paddingBottom: 8,
            paddingRight: 4,
            borderRadius: 8,
            borderLeftColor: '#0793ac',
            borderLeftWidth: 6,
            gap: 4
          }
        ]}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Text style={{ color: '#3d3d3d', paddingTop: 8 }} weigth="bold">
            Sucesso
          </Text>
          <CloseToastButton onPress={closeToast} />
        </View>
        <Text style={{ color: '#3d3d3d' }} weigth="semiBold">
          {openToast ? totalMessage : maxMessage}
        </Text>
      </PressableAnimated>
    </GestureDetector>
  )
}

export function LoginModule() {
  const setIsLoading = useLoadingStore((action) => action.setLoading)
  const { setRememberedUserCredentials, rememberedUserCredentials } = useLoginStore()

  const { control, handleSubmit } = useForm<LoginFormData>({
    resolver: zodResolver(LoginUserSchema),
    defaultValues: rememberedUserCredentials!
  })

  async function handleUserLoginSubmit(values: LoginFormData) {
    try {
      setIsLoading(true)
      Keyboard.dismiss()
      await loginService.authenticateUser(values)
      handleRememberCrendetialsCheck(values)
    } catch (error) {
      if (error instanceof AuthError) {
        toast.error({ title: 'Não foi possível fazer login', text: error.message })
      }
    } finally {
      setIsLoading(false)
    }
  }

  function handleRememberCrendetialsCheck(values: LoginFormData) {
    if (values.rememberCrendentials) {
      setRememberedUserCredentials(values)
      return
    }

    setRememberedUserCredentials(null)
  }

  return (
    <Container>
      <View style={loginStyles.main}>
        <Text style={{ fontSize: 42, color: theme.colors.primary }} weigth="bold">
          RN Sport
        </Text>
        <Pop />
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
        <HFCheckbox control={control} name="rememberCrendentials" text="Lembrar senha" />
        <Button
          title="toast 1"
          onPress={() => {
            showPop('', () => {
              console.log('press mensagem de teste')
            })
          }}
        />
        <Button
          title="toast 2"
          onPress={() => {
            showPop(
              '[I keep getting the error that says string is not assignable to parameter of type never in react native typescript and I don t know why. Can someone help me fix this bug.',
              () => {
                console.log(
                  'press outra mensagem muito grande agora com um texto maior do qe td'
                )
              }
            )
          }}
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
