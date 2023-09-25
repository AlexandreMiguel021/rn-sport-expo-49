import { theme } from '@/theme'
import { StyleSheet } from 'react-native'

export const loginStyles = StyleSheet.create({
  main: {
    flex: 1,
    gap: 16,
    justifyContent: 'center',
    marginHorizontal: 'auto'
  },
  description: {
    fontSize: 20,
    fontWeight: '400',
    marginBottom: 12
  },
  inputext: {
    paddingHorizontal: 8,
    paddingVertical: 12,
    backgroundColor: '#dad9d9',
    fontSize: 18,
    borderRadius: 6
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 12,
    borderRadius: 6
  },
  button_text: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center'
  },
  pressable: {
    alignSelf: 'flex-end',
  },
  pressable_text: {
    fontSize: 14,
    fontWeight: '500',
    color: theme.colors.primary
  }
})
