export class AuthError {
  message: string
  code: string | undefined

  constructor(error: AuthError) {
    if (!error.message) {
      error.message =
        'Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.'
    }

    this.message = removeTextInBrackets(error.message)
  }
}

function removeTextInBrackets(message: string) {
  return message.replace(/\[.*?\]/g, '').trim()
}
