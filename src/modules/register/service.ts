import { IUser } from "@/models/user";
import auth from "@react-native-firebase/auth";

export const registerService = {
  createUser: async ({ email, password }: IUser) => {
    try {
      await auth().createUserWithEmailAndPassword(email, password);
    } catch (error) {
      throw new Error(
        "Ocorreu um erro durante o registro. Por favor, tente novamente mais tarde."
      );
    }
  },
};
