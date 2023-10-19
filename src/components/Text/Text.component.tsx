import { ReactNode } from 'react'
import { Text as RNText } from 'react-native'
import type { TextProps as RNTextProps } from 'react-native'

type Textrops = RNTextProps & {
  children: ReactNode
  weigth?: keyof typeof fontWeight
}

export const fontWeight = {
  normal: 'Poppins',
  thin: 'Poppins100',
  extraLight: 'Poppins200',
  light: 'Poppins300',
  semiBold: 'Poppins500',
  bold: 'Poppins600',
  extraBold: 'Poppins700'
}

export function Text({ children, style, weigth = 'normal', ...rest }: Textrops) {
  return (
    <RNText
      style={[style, { fontFamily: fontWeight[weigth], includeFontPadding: false }]}
      {...rest}
    >
      {children}
    </RNText>
  )
}
