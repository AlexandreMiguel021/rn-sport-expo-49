import {
  Control,
  Controller,
  FieldValues,
  UseControllerProps,
} from 'react-hook-form'
import { TextInput } from '../inputs/TextInput'
import { TextInputProps } from 'react-native'

export type HFTextInputProps<T extends FieldValues> = UseControllerProps<T> &
  TextInputProps & {
    name: string;
    control: Control<T>;
  };

export function HFTextInput<T extends FieldValues>({
  control,
  name,
  defaultValue,
  ...rest
}: HFTextInputProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { onChange, value = '' }, fieldState: { error } }) => (
        <TextInput
          onChangeText={onChange}
          value={value}
          errorMessage={error?.message}
          {...rest}
        />
      )}
    />
  )
}
