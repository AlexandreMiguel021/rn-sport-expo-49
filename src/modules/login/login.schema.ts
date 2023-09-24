import * as z from 'zod'

export const LoginUserSchema = z.object({
  email: z
    .string({ required_error: 'E-mail é obrigatório' })
    .email('Formato de e-mail inválido')
    .toLowerCase(),
  password: z
    .string({ required_error: 'Senha é obrigatório' })
    .min(6, 'Senha precisa ter ao menos 6 digitos')
})

export type LoginFormData = z.infer<typeof LoginUserSchema>
