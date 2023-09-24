import * as z from 'zod'

export const registerUserSchema = z.object({
  email: z
    .string({ required_error: 'E-mail é obrigatório' })
    .email('Formato de e-mail inválido')
    .toLowerCase(),
  password: z
    .string({ required_error: 'Senha é obrigatório' })
    .min(6, 'Senha precisa ter ao menos 6 digitos'),
})

export type RegisterFormData = z.infer<typeof registerUserSchema>;
