import { IUser } from '@/models/user'
import auth from '@react-native-firebase/auth'

export const loginService = {
  authenticateUser: async ({ email, password }: IUser) => {
    const { user } = await auth().signInWithEmailAndPassword(email, password)
  }
}
