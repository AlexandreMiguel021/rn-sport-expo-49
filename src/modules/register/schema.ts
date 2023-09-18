import * as z from "zod";

export const userSchema = z.object({
  email: z
    .string()
    .email("Formato de e-mail inválido")
    .toLowerCase()
    .nonempty("E-mail é obrigatório"),
  password: z.string().min(6, "Senha precisa ter ao menos 6 digitos"),
});
