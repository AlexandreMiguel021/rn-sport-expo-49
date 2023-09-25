import {
  Control,
  Controller,
  FieldValues,
  UseControllerProps
} from 'react-hook-form'
import { TextInputProps } from 'react-native'

import { TextInput } from '../TextInput'
import BouncyCheckbox, { IBouncyCheckboxProps } from 'react-native-bouncy-checkbox'
import { theme } from '@/theme'

export type HFCheckboxProps<T extends FieldValues> = UseControllerProps<T> &
  IBouncyCheckboxProps & {
    name: string
    control: Control<T>
  }

export function HFCheckbox<T extends FieldValues>({
  control,
  name,
  defaultValue,
  ...rest
}: HFCheckboxProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { onChange, value } }) => (
        <BouncyCheckbox
          onPress={(check) => onChange(check)}
          textStyle={{
            fontFamily: 'Poppins500',
            includeFontPadding: false,
            textDecorationLine: 'none'
          }}
          isChecked={value}
          fillColor={theme.colors.primary}
          {...rest}
        />
      )}
    />
  )
}
