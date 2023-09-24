import { theme } from '@/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
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
})
