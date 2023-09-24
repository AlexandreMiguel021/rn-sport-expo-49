import auth from '@react-native-firebase/auth'
import { RegisterFormData } from './register.schema'
import { AuthError } from '@/utils/auth-error-handler'

export const registerService = {
  createUser: async ({ email, password }: RegisterFormData) => {
    try {
      await auth().createUserWithEmailAndPassword(email, password)
    } catch (error) {
      throw new AuthError(error as AuthError)
    }
  }
}
