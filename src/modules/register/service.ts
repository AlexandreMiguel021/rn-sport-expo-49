import auth from '@react-native-firebase/auth'

import { RegisterFormData } from './schema'

export const registerService = {
  createUser: async ({ email, password }: RegisterFormData) => {
    try {
      await auth().createUserWithEmailAndPassword(email, password)
    } catch (error) {
      throw new Error(
        'Ocorreu um erro durante o registro. Por favor, tente novamente mais tarde.'
      )
    }
  },
}
