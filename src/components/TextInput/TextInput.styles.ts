import { theme } from '@/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  main: {
    flex: 1,
    gap: 16,
    justifyContent: 'center',
    marginHorizontal: 'auto',
  },
  description: {
    fontSize: 20,
    fontWeight: '400',
    marginBottom: 12,
  },
  inputext: {
    paddingHorizontal: 8,
    paddingVertical: 12,
    backgroundColor: '#dad9d9',
    fontSize: 16,
    borderRadius: 6,
    fontFamily: 'Poppins500',
    includeFontPadding: false
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 12,
    borderRadius: 6,
  },
  button_text: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  error_text: {
    fontWeight: '600',
    color: '#C3423F',
  },
  input_error :{
    borderWidth: 1,
    borderColor: '#C3423F',
    backgroundColor: '#C3423F10'
  }
})
