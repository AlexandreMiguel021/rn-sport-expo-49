import { theme } from '@/theme'
import { MaterialIcons } from '@expo/vector-icons'
import { StyleProp, TextStyle, View } from 'react-native'
import RNToast, {
  BaseToast,
  BaseToastProps,
  ErrorToast,
  ToastShowParams
} from 'react-native-toast-message'

export function Toast() {
  return (
    <View style={{ zIndex: 5 }}>
      <RNToast config={toastConfig} />
    </View>
  )
}

const toastConfig = {
  success: (props: JSX.IntrinsicAttributes & BaseToastProps) => (
    <BaseToast
      {...props}
      renderTrailingIcon={() => (
        <IconToast name="check" color={theme.colors.success} />
      )}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      style={{ borderLeftColor: theme.colors.success }}
      text1Style={textStyles.text1}
      text2Style={textStyles.text2}
    />
  ),
  error: (props: JSX.IntrinsicAttributes & BaseToastProps) => (
    <ErrorToast
      {...props}
      renderTrailingIcon={() => (
        <IconToast name="error" color={theme.colors.error} />
      )}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      style={{ borderColor: theme.colors.error }}
      text1Style={textStyles.text1}
      text2Style={textStyles.text2}
    />
  )
}

const textStyles: Record<string, StyleProp<TextStyle>> = {
  text1: {
    fontSize: 16,
    fontFamily: 'Poppins600',
    includeFontPadding: false,
    fontWeight: '600'
  },
  text2: {
    fontSize: 14,
    fontFamily: 'Poppins500',
    includeFontPadding: false
  }
}

type IconToastProps = {
  name: keyof typeof MaterialIcons.glyphMap
  color: string
}

function IconToast(props: IconToastProps) {
  return <MaterialIcons {...props} size={24} style={{ margin: 4 }} />
}

type ToastShowCustomProps = Omit<ToastShowParams, 'type' | 'text1' | 'text2'> & {
  title: string
  text?: string
}

export const toast = {
  error: ({ title, text, ...rest }: ToastShowCustomProps) => {
    RNToast.show({ type: 'error', text1: title, text2: text, ...rest })
  },

  success: ({ title, text, ...rest }: ToastShowCustomProps) => {
    RNToast.show({ type: 'success', text1: title, text2: text, ...rest })
  }
}
