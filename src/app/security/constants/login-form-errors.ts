export const LOGIN_FORM_ERRORS = Object.freeze({
  email: {
    errors: ['required', 'email'],
    messages: ['O email não pode ser nulo', 'O email fornecido é inválido'],
  },
  password: {
    errors: ['required', 'minlength'],
    messages: ['A senha não pode ser nula', 'A senha deve conter ao menos 5 caracteres'],
  },
});
