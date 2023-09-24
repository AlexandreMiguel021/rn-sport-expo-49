import auth from '@react-native-firebase/auth'

import { AuthError } from '@/utils/auth-error-handler'
import { LoginFormData } from './login.schema'

export const loginService = {
  authenticateUser: async ({ email, password }: LoginFormData) => {
    try {
      const res = await auth().signInWithEmailAndPassword(email, password)
      console.log(JSON.stringify(res, null, 4))
    } catch (error) {
      throw new AuthError(error as AuthError)
    }
  }
}
