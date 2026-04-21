export const UPDATE_USER_FORM_ERRORS = Object.freeze({
  name: {
    errors: ['required', 'minlength'],
    messages: ['O nome não pode ser nulo', 'O nome deve conter ao menos 3 caracteres'],
  },
  email: {
    errors: ['required', 'email'],
    messages: ['O email não pode ser nulo', 'O email fornecido é inválido'],
  },
  password: {
    errors: ['nullableMinLength'],
    messages: ['A senha deve conter ao menos 5 caracteres'],
  },
  cpf: {
    errors: ['required', 'minlength', 'maxlength', 'unsignedIntegerSequence'],
    messages: [
      'O CPF não pode ser nulo',
      'O CPF deve conter ao menos 11 caracteres',
      'O CPF deve conter no máximo 11 caracteres',
      'O CPF deve conter apenas números',
    ],
  },
  phone: {
    errors: ['required', 'minlength', 'maxlength', 'unsignedIntegerSequence'],
    messages: [
      'O telefone não pode ser nulo',
      'O telefone deve conter ao menos 11 caracteres',
      'O telefone deve conter no máximo 11 caracteres',
      'O telefone deve conter apenas números',
    ],
  },
  gender: {
    errors: ['required'],
    messages: ['O sexo não pode ser nulo'],
  },
  birthDate: {
    errors: ['required', 'hasAgeToEnroll'],
    messages: [
      'A data de nascimento não pode ser nula',
      'O usuário deve ter uma idade entre 12 e 120 anos',
    ],
  },
});
