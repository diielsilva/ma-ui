export const searchOrderFormErrors = {
  cpf: {
    errors: ['required', 'minlength', 'maxlength', 'unsignedIntegerSequence'],
    messages: [
      'O CPF não pode ser nulo',
      'O CPF deve conter ao menos 11 caracteres',
      'O CPF deve conter no máximo 11 caracteres',
      'O CPF deve conter apenas números',
    ],
  },
};
