import auth from '@react-native-firebase/auth'

import { AuthError } from '@/utils/auth-error-handler'
import { LoginFormData } from './login.schema'

export const loginService = {
  authenticateUser: async ({ email, password }: LoginFormData) => {
    try {
      await auth().signInWithEmailAndPassword(email, password)
    } catch (error) {
      throw new AuthError(error as AuthError)
    }
  }
}
