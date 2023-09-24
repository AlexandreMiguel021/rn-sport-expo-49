import { TextInput as TextInputNative, View } from 'react-native'
import type { TextInputProps as TextInputPropsNative } from 'react-native'

import { styles } from './TextInput.styles'
import { Text } from '../Text/Text.component'

type TextInputProps = TextInputPropsNative & {
  errorMessage?: string
}

export function TextInput({ errorMessage, ...rest }: TextInputProps) {
  return (
    <View>
      <TextInputNative
        style={[styles.inputext, errorMessage ? styles.input_error : {}]}
        {...rest}
      />
      {errorMessage && <Text style={styles.error_text}>{errorMessage}</Text>}
    </View>
  )
}
